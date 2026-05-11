/**
 * 晨报生成器
 * 整合各模块数据生成完整晨报
 * 支持详细步骤日志
 */

const { getWeatherModule } = require('../modules/weather');
const { getPremarketModule } = require('../modules/premarket');
const { getNewsModule } = require('../modules/news');
const { getFunModule } = require('../modules/fun');

// 日志回调函数（由 server.js 设置）
let logCallback = null;

function setLogCallback(cb) {
  logCallback = cb;
}

// 辅助函数：带计时的模块获取
async function fetchModule(name, fetchFn) {
  const start = Date.now();
  logCallback?.({ status: 'running', message: `📡 正在获取${name}...`, step: name, created_at: new Date().toISOString() });
  
  try {
    const data = await fetchFn();
    const duration = Date.now() - start;
    logCallback?.({ status: 'running', message: `✅ ${name}获取完成 (${(duration/1000).toFixed(1)}s)`, step: name, duration, created_at: new Date().toISOString() });
    return data;
  } catch (e) {
    const duration = Date.now() - start;
    logCallback?.({ status: 'running', message: `❌ ${name}获取失败: ${e.message}`, step: name, duration, created_at: new Date().toISOString() });
    throw e;
  }
}

async function generateReport(onStep) {
  // 设置日志回调
  if (onStep) {
    logCallback = onStep;
  }
  
  logCallback?.({ status: 'running', message: '🚀 开始生成晨报...', step: 'start', created_at: new Date().toISOString() });
  
  // 串行获取各模块数据（以便记录每步耗时）
  const weather = await fetchModule('天气数据', () => 
    getWeatherModule({ modules: { weather: { enabled: true, items: { current: true, forecast: true, aqi: true, clothing: true, travel: true } } } })
  );
  
  const premarket = await fetchModule('盘前数据', () => 
    getPremarketModule({ modules: { premarket: { enabled: true, items: { forex: true, china: true, a50: true, hk: true, us: true, nikkei: false } } } })
  );
  
  const news = await fetchModule('新闻资讯', () => 
    getNewsModule({ modules: { news: { enabled: true, items: { tech: true, finance: true } } } })
  );
  
  const fun = await fetchModule('趣味内容', () => 
    getFunModule({ modules: { fun: { enabled: true, items: { lunar: true, history: true, knowledge: true, reminder: true, joke: true } } } })
  );

  // 渲染
  logCallback?.({ status: 'running', message: '🎨 渲染晨报模板...', step: 'render', created_at: new Date().toISOString() });
  await new Promise(r => setTimeout(r, 50)); // 模拟渲染时间

  const now = new Date();
  const data = {
    version: '2.0.0',
    date: now.toISOString().split('T')[0],
    generatedAt: now.toISOString(),
    modules: {
      weather,
      premarket,
      news,
      fun
    }
  };
  
  logCallback?.({ status: 'running', message: '💾 保存数据...', step: 'save', created_at: new Date().toISOString() });
  
  return data;
}

// 单独测试
if (require.main === module) {
  generateReport(log => console.log(`[${log.step}] ${log.message}`)).then(data => {
    console.log('✅ 晨报生成完成');
    console.log(JSON.stringify(data, null, 2));
  }).catch(e => {
    console.error('❌ 错误:', e.message);
  });
}

module.exports = { generateReport, setLogCallback };
