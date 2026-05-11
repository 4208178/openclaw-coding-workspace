# 晨间速递 - 渐进式开发计划

## 项目概述
- **项目名称**: 晨间速递 (Morning News)
- **当前版本**: v1.0.0 (定时脚本)
- **目标版本**: v2.0.0 (REST API + MySQL)

---

## 阶段一：RESTful API 服务 (v2.0.0)

### 目标
将当前定时脚本改造为 API 服务，数据存入 MySQL，支持历史查询

### 技术栈
- **运行时**: Node.js + Express
- **数据库**: MySQL
- **数据格式**: JSON

### API 设计

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/report/latest` | GET | 获取最新一期晨报 |
| `/api/report/history?date=YYYY-MM-DD` | GET | 获取指定日期晨报 |
| `/api/admin/regenerate` | POST | 触发重新生成今日内容 |
| `/api/health` | GET | 健康检查 |

### 数据库设计

```sql
-- 晨报主表
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (date)
);

-- 执行日志表
CREATE TABLE job_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  report_date DATE,
  status ENUM('running', 'success', 'failed') DEFAULT 'running',
  message TEXT,
  duration_ms INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 实现步骤
1. 安装 Express 和 MySQL 依赖
2. 创建数据库连接模块
3. 创建数据模型（Report, JobLog）
4. 实现 API 端点
5. 改造定时任务为 API 可调用
6. 数据迁移（已有晨报数据）

---

### 阶段二：WebSocket 实时日志

### 目标
管理端查看推送任务实时日志

### 技术栈
- **后端**: Express + ws (WebSocket)
- **前端**: 简单的 Web 管理页面

### 实现步骤
1. 集成 WebSocket 服务
2. 任务执行时推送日志
3. 管理端日志展示页面

---

### 阶段三：响应式 Web 页面

### 目标
漂亮的响应式 Web 页面

### 技术栈
- Vue 3 + Vite + Tailwind CSS

---

### 阶段四：PWA 支持

### 目标
可安装，离线查看

---

### 阶段五：微信小程序

### 目标
微信小程序版本

---

## 进度跟踪

| 阶段 | 状态 | 完成度 |
|------|------|--------|
| v1.0.0 基础功能 | ✅ 完成 | 100% |
| v2.0.0 REST API | 🔄 进行中 | 0% |
| WebSocket 日志 | ⏳ 待开始 | 0% |
| Web 页面 | ⏳ 待开始 | 0% |
| PWA | ⏳ 待开始 | 0% |
| 微信小程序 | ⏳ 待开始 | 0% |

---

**最后更新**: 2026-05-11 15:12
**负责人**: 蜜蜂CTO
