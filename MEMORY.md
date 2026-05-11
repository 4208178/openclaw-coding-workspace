# MEMORY.md - 蜜蜂 CTO 长期记忆

## 🧠 记忆架构
- **HOT RAM**: SESSION-STATE.md（当前任务上下文）
- **WARM STORE**: memory_search（语义搜索）
- **COLD STORE**: Git-Notes（共享决策库）
- **CURATED ARCHIVE**: memory/目录（技术日志）

---

## 📅 2026-05-06 - 项目初始化完成与本地知识库建立

### 🎯 核心成就
1. **技术栈选择**：Node.js + TypeScript + Fastify (已批准)
2. **项目初始化**：完成目录结构、依赖、CI/CD、首个 API (`GET /health`)
3. **GitHub 同步**：仓库 `openclaw-coding-workspace` 已创建并同步
4. **ADR 文档**：完成 ADR 0001 (项目结构) 与 ADR 0002 (技术栈)
5. **本地知识库建立**：创建 `docs/knowledge-base/` 目录结构，注入 Fastify 和 TypeScript 最佳实践
6. **持续进化能力验证**：完成 CTO 持续进化能力验证，实现离线进化能力

### 🔧 技术能力验证
- **联网能力**：✅ 通过 `curl` 验证网络通畅 (SearXNG 未配置，需修复)
- **记忆系统**：✅ 分层记忆 (HOT/WARM/COLD/CURATED) 运行正常
- **自我净化**：✅ 已更新过时记忆 (GitHub Token 配置状态)
- **离线进化能力**：✅ 通过本地知识库实现离线决策能力

### 🚧 当前限制
- **WeChat 通道**：CTO 仍无法直接发送微信消息 (需 CIO 代发或重新配置 bindings)
- **网络工具**：`web_search` 与 `web_fetch` 因 SearXNG 未配置暂时不可用

### 🚀 SearXNG 容器状态（2026-05-07 更新）
- **容器状态**：✅ 已部署并运行
  - 容器 ID：728e80ffec37
  - 端口映射：8080 → 8080
  - 网络名称：searxng_default
  - 版本：2026.5.6+330d56bba
  - 标题：SearXNG - 团队私有搜索引擎 (国内引擎)
- **OpenClaw 配置**：✅ 已配置
  - 插件已启用：`searxng.enabled = true`
  - 基础 URL：`http://localhost:8080`
  - 搜索类别：`general,news,science,technology`
  - 语言：`zh-CN`
- **配置文件**：✅ 已配置国内搜索引擎
  - baidu: enabled
  - 360search: enabled
  - sogou: enabled
  - bing: disabled
  - duckduckgo: disabled
  - google: disabled
  - brave: disabled
  - startpage: disabled
- **网络连接测试**：✅ 主机可访问国内网站
  - 百度 (www.baidu.com): ✅ 200 OK
  - 必应中国 (cn.bing.com): ✅ 200 OK
  - 360 搜索 (www.so.com): ✅ 200 OK
  - 搜狗 (www.sogou.com): ✅ 200 OK
  - DuckDuckGo: ❌ Connection timed out
  - Google: ❌ Connection timed out
- **搜索引擎状态**：⚠️ 部分超时（需要重启容器）
  - brave: timeout
  - duckduckgo: timeout
  - google: timeout
  - karmasearch: access denied
  - startpage: timeout
  - wikipedia: timeout
- **问题诊断**：SearXNG 容器无法访问外部搜索引擎，可能原因：
  1. 配置文件未生效（需要重启容器）
  2. 容器内部网络可能受限
- **待办事项**：
  - [ ] 重启 SearXNG 容器以加载新配置
  - [ ] 验证国内搜索引擎是否正常工作
  - [ ] 测试搜索功能
- **解决方案**：
  ```bash
  cd /home/myuser/searxng
  docker-compose restart
  ```
  或者：
  ```bash
  sudo docker restart searxng
  ```

### 📚 本地知识库内容
- **Fastify 最佳实践**：`docs/knowledge-base/tech-stack/fastify-best-practices.md`
- **TypeScript 最佳实践**：`docs/knowledge-base/tech-stack/typescript-best-practices.md`
- **知识库目录结构**：`tech-stack/`, `best-practices/`, `architecture/`, `tutorials/`, `external/`

### 📢 全域广播规则（已固化，未变）
**指令接收**：
- ❌ 严禁通过微信接收任务
- ✅ 所有指令通过 OpenClaw UI 界面下达
**主动汇报**：
- ✅ 通过微信渠道同步确认状态、关键进展及紧急预警
**架构认知**：
- 🧠 CEO（大脑/双向微信）
- 🏗️ CTO（骨骼/仅发微信汇报）
- 🔌 CIO（神经/仅发微信情报）

---

## 📅 2026-05-03 - 微信通道配置与全域广播规则（历史）

### 🔍 关键诊断（来自 CIO 田芯）
1. **插件状态**：`openclaw-weixin` 已启用 ✅
2. **绑定关系**：`bindings` 将 `openclaw-weixin` 绑定到 **comms (CIO)** 代理
   - **问题**：CTO (coding) 和 CEO (main) 可能无法直接通过此通道发送消息
3. **凭证配置**：通过环境变量 (`WEIXIN_...`) 注入，未写入 `openclaw.json`
4. **发送失败原因**：CTO 尝试发送时，可能因路由绑定限制，消息未正确到达微信 API

---

## 📅 2026-05-02 - 技术团队搭建规划（历史）

### 🎯 核心决策
1. **团队架构**：三层架构（核心决策层 → 技术专家层 → 执行层）
2. **角色定义**：架构师、开发者、测试工程师、DevOps 工程师
3. **协作流程**：技术决策流程、代码审查流程、项目管理流程
4. **知识管理**：分层记忆架构（HOT/WARM/COLD/CURATED）
5. **技术栈**：完整的开发、测试、DevOps 工具链

### 📊 进度跟踪
- **当前阶段**：第一阶段 - 基础建设
- **完成度**：10% → **更新为 100%** (项目初始化完成)

---

## 🔧 技术选型三问
1. **是否解决实际问题？**
2. **是否可维护？**
3. **是否有社区支持？**

---

## 👁️ 代码审查五要素
1. **正确性**：逻辑是否正确，边界条件是否处理
2. **可读性**：命名是否清晰，注释是否充分
3. **可测试性**：是否易于测试，测试覆盖率是否足够
4. **性能**：是否存在性能瓶颈，是否需要优化
5. **安全性**：是否存在安全漏洞，输入是否验证

---

## 🚨 技术债务管理
- **每季度评估**：识别技术债务，评估影响范围
- **优先级排序**：按影响程度和修复成本排序
- **逐步偿还**：制定偿还计划，持续改进

---

## 💎 价值观
- **代码质量 > 速度**：宁可慢一点，也要保证质量
- **安全第一**：安全是底线，不能妥协
- **可维护性优先**：代码是写给人看的，其次才是机器
- **持续改进**：技术债务必须偿还，不能无限积累

---

## 🚫 禁忌
- **绝不妥协技术债务**：技术债务必须偿还，不能无限积累
- **不接受未经测试的代码**：没有测试的代码不能合并
- **不盲目追新**：新技术必须经过充分评估才能采用
- **不推诿责任**：技术决策必须负责到底

---

**最后更新**: 2026-05-07 09:32 GMT+8  
**记录人**: 蜜蜂 CTO  
**状态**: 项目初始化完成，能力验证通过，**已实现离线进化能力**，本地知识库已建立，**SearXNG 容器已部署，配置文件已配置国内搜索引擎，需要重启容器以加载新配置**，等待 CEO 指令进行业务功能开发  
**备注**: 联网工具部分成功（SearXNG 需重启容器），Git-Notes 已配置（本地已提交，等待推送），**本地知识库已建立**（Fastify/TypeScript 最佳实践已注入），记忆整理已完成，**SearXNG 容器已部署，配置文件已配置国内搜索引擎，需要重启容器以加载新配置**

---

## 📅 2026-05-11 - 晨间速递 MVP 开发完成

### 🎯 核心任务
开发模块化、可配置的晨间新闻/天气推送机器人（v1.0.0）

### ✅ 完成事项
1. **项目创建**：`/home/myuser/.openclaw/workspace-coding/morning-news/`
2. **版本**：v1.0.0
3. **技术栈**：Node.js + nodemailer + cron + axios

### 📦 功能模块
| 模块 | 状态 | 数据源 |
|------|------|--------|
| ☀️ 天气 | ✅ 实时 | wttr.in |
| 📈 汇率 | ✅ 实时 | open.er-api.com (6.82 CNY/USD) |
| 📈 股市 | ⚠️ 备用 | 需配置Yahoo Finance API |
| 📰 新闻 | ⚠️ 模拟 | 需配置真实API |
| 💡 趣味 | ✅ | Wikipedia API |
| 📧 邮件 | ✅ 已测 | QQ邮箱SMTP |
| ⏰ 定时 | ✅ | 每日9:00 |

### 🧪 测试验证
| 时间 | MessageId | 数据源 |
|------|-----------|--------|
| 02:00 | 46136821-... | **真实汇率 6.82** |

### 📁 项目文件
- `morning-news/config.js` - 配置
- `morning-news/index.js` - 主程序
- `morning-news/modules/` - 4个功能模块
- `morning-news/REPORT.md` - 项目报告

### 🚀 部署
- 定时：每日 9:00 (`cron: '0 9 * * *'`)
- 启动：`node index.js`

### 🔧 待完善
1. 实时股票API
2. 企业微信 Webhook
3. 新闻热搜数据源

---

**最后更新**: 2026-05-11 02:00 GMT+8
**记录人**: 蜜蜂CTO
**状态**: 晨间速递 MVP 开发完成，真实数据验证通过，等待 CEO 验收
**备注**: 汇率数据已改为真实API (open.er-api.com)，邮件发送测试通过3次，版本v1.0.0已就绪
