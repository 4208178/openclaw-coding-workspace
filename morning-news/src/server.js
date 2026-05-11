/**
 * 晨间速递 REST API 服务
 * 版本: v2.0.0
 * 
 * 端点:
 *   GET  /api/report/latest   - 获取最新一期晨报
 *   GET  /api/report/history  - 获取历史晨报列表
 *   GET  /api/report/:date    - 获取指定日期晨报
 *   POST /api/admin/regenerate - 触发重新生成
 *   GET  /api/health          - 健康检查
 *   GET  /api/logs            - 获取执行日志
 */

const os = require('os');
const path = require('path');
const fs = require('fs');

// 加载环境变量
require('dotenv').config();

// 强制设置正确的 cwd
const expectedRoot = os.platform() === 'win32' 
  ? __dirname.replace(/\\src$/, '')
  : __dirname.replace(/\/src$/, '');

try {
  process.chdir(expectedRoot);
} catch(e) {
  if (!process.cwd().includes('morning-news')) {
    process.chdir('/home/myuser/.openclaw/workspace-coding/morning-news');
  }
}

const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');

const projectRoot = process.cwd();
console.log('📁 项目根目录:', projectRoot);

const { 
  getLatestReport, 
  getReportByDate, 
  getReportList,
  saveReport,
  getJobLogs,
  startJob,
  updateJob
} = require('./database');

// 消息广播器 - 带去重
const logBroadcast = (() => {
  let wss = null;
  const recentMessages = new Map(); // 防止重复消息
  
  return {
    setWss(ws) { wss = ws; },
    send(log) {
      // 去重：同一 jobId 的 success 只发一次
      const key = `${log.jobId || 'global'}-${log.status}`;
      if (log.status === 'success' && recentMessages.has(key)) {
        return; // 已发送过 success，跳过
      }
      if (log.status === 'success') {
        recentMessages.set(key, true);
        // 5秒后清除标记
        setTimeout(() => recentMessages.delete(key), 5000);
      }
      
      if (wss) {
        wss.clients.forEach(client => {
          if (client.readyState === 1) {
            client.send(JSON.stringify(log));
          }
        });
      }
    }
  };
})();

// 生成晨报的函数
const { generateReport } = require('./report-generator');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务 (PWA资源)
app.use(express.static(path.join(projectRoot, 'public')));

// 页面路由 (必须放在API之前)
app.get('/admin', (req, res) => {
  const filePath = path.join(projectRoot, 'public', 'admin.html');
  res.send(fs.readFileSync(filePath, 'utf8'));
});

app.get('/', (req, res) => {
  const filePath = path.join(projectRoot, 'public', 'index.html');
  res.send(fs.readFileSync(filePath, 'utf8'));
});

// ============ API 端点 ============

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    version: '2.0.0',
    timestamp: new Date().toISOString() 
  });
});

// 获取最新一期晨报
app.get('/api/report/latest', (req, res) => {
  try {
    const report = getLatestReport();
    if (!report) {
      return res.status(404).json({ error: '暂无晨报数据' });
    }
    res.json(report);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 获取历史晨报列表
app.get('/api/report/history', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const list = getReportList(limit);
    res.json({ list });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 获取指定日期晨报
app.get('/api/report/:date', (req, res) => {
  try {
    const { date } = req.params;
    const report = getReportByDate(date);
    if (!report) {
      return res.status(404).json({ error: `未找到 ${date} 的晨报` });
    }
    res.json(report);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 触发重新生成今日内容
app.post('/api/admin/regenerate', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const jobId = startJob(today);
  const startTime = Date.now();
  
  console.log(`[API] 开始生成 ${today} 的晨报...`);
  logBroadcast.send({ jobId, status: 'running', message: `开始生成 ${today} 的晨报...`, created_at: new Date().toISOString() });
  
  try {
    // 生成晨报，传入日志回调获取每步耗时
    const { generateReport } = require('./report-generator');
    
    const data = await generateReport((log) => {
      logBroadcast.send({ jobId, ...log });
    });
    
    saveReport(today, data);
    
    const duration = Date.now() - startTime;
    updateJob(jobId, 'success', '生成成功', duration);
    logBroadcast.send({ jobId, status: 'success', message: `✅ 任务完成，总耗时 ${duration}ms`, duration, created_at: new Date().toISOString() });
    
    res.json({ 
      success: true, 
      date: today,
      message: '晨报生成成功',
      duration 
    });
  } catch (e) {
    const duration = Date.now() - startTime;
    updateJob(jobId, 'failed', e.message, duration);
    logBroadcast.send({ jobId, status: 'failed', message: `❌ 生成失败: ${e.message}`, duration, created_at: new Date().toISOString() });
    
    res.status(500).json({ 
      success: false, 
      error: e.message 
    });
  }
});

// 获取执行日志
app.get('/api/logs', (req, res) => {
  try {
    const date = req.query.date;
    const limit = parseInt(req.query.limit) || 100;
    const logs = date ? getJobLogs(date, limit) : getJobLogs(null, limit);
    res.json({ logs });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 启动服务器
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`🌟 晨间速递 API 服务已启动`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   健康检查: http://localhost:${PORT}/api/health`);
    console.log(`   最新晨报: http://localhost:${PORT}/api/report/latest`);
  });
  
  // WebSocket 服务
  const wss = new WebSocketServer({ server, path: '/ws' });
  wss.on('connection', (ws) => {
    console.log('[WS] 客户端连接');
  });
  logBroadcast.setWss(wss);
  
  // 捕获所有未处理错误
  app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Error: ' + err.message);
  });
  
  return server;
}

// 单独运行
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
