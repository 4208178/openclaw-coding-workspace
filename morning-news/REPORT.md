# 晨间速递 Morning News - 项目报告

**版本**: v2.0.0  
**日期**: 2026-05-11  
**作者**: 蜜蜂CTO

---

## 项目概述

模块化、可配置的晨间新闻/天气推送机器人，支持 Web 界面查看和 PWA 安装。

**在线地址**: `http://<IP>:3000`

---

## 功能模块

| 模块 | 状态 | 数据源 |
|------|------|--------|
| ☀️ 天气 | ✅ 实时 | wttr.in |
| 📈 汇率 | ✅ 实时 | open.er-api.com |
| 📰 新闻 | ✅ | 少数派 + 抖音热榜 + Hacker News |
| 💡 趣味 | ✅ | Wikipedia API |

---

## 技术架构

- **后端**: Node.js + Express + SQLite
- **前端**: 原生 HTML/CSS/JS
- **定时**: cron (`0 9 * * *` 每日9:00)
- **PWA**: manifest.json + Service Worker

---

## 完成的特性

### v2.0.0 (2026-05-11)
- ✅ PWA 支持（可安装到主屏幕）
- ✅ 环境变量配置 (dotenv)
- ✅ API 密钥移至 .env
- ✅ 响应式 UI 优化
- ✅ 来源标签彩色化
- ✅ 抖音热榜话题标签

### v1.0.0 (历史)
- ✅ 天气/汇率/新闻/趣味模块
- ✅ REST API
- ✅ WebSocket 实时推送
- ✅ 邮件推送

---

## 文件结构

```
morning-news/
├── src/
│   ├── server.js          # API 服务
│   ├── database.js        # SQLite 数据库
│   └── report-generator.js # 晨报生成器
├── modules/
│   ├── weather.js         # 天气模块
│   ├── news.js            # 新闻模块
│   ├── premarket.py       # 盘前数据
│   └── fun.js             # 趣味模块
├── public/
│   ├── index.html         # 主页面
│   ├── manifest.json      # PWA 清单
│   ├── sw.js              # Service Worker
│   └── icon.svg           # 应用图标
├── config.js              # 配置文件
├── .env                   # 环境变量
├── .gitignore
└── package.json
```

---

## 环境变量

```bash
SMTP_HOST=smtp.qq.com
SMTP_USER=xxx@qq.com
SMTP_PASS=xxx
WECHAT_WEBHOOK=    # 可选
```

---

## 部署

```bash
cd morning-news
npm install
node src/server.js
# 访问 http://localhost:3000
```

---

## 待办

- [ ] 添加更多新闻源（科技/财经）
- [ ] 实时股票数据
- [ ] 企业微信推送
- [ ] 暗色模式
- [ ] 移动端优化

---

## GitHub

仓库: https://github.com/4208178/openclaw-coding-workspace

提交: `b011cbe` - feat: PWA support, env vars, config cleanup
