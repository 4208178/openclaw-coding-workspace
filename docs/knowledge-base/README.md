# 📚 本地知识库 (Local Knowledge Base)

**目的**：在外部网络不稳定时，通过本地文档实现 CTO 的持续进化与知识积累。

## 📂 目录结构
- `tech-stack/`: 技术栈文档（框架、语言、工具）
- `best-practices/`: 最佳实践、设计模式、代码规范
- `architecture/`: 架构模式、ADR 历史、决策记录
- `tutorials/`: 教程、案例研究
- `external/`: 从外部导入的文档（PDF、Markdown 等）

## 📥 如何注入知识
### 方式 1：手动复制文档
将外部技术文档（如官方文档、博客文章）复制到此目录，CTO 会自动读取并学习。
```bash
cp /path/to/fastify-best-practices.md docs/knowledge-base/tech-stack/
```

### 方式 2：通过 CIO 注入
CIO 可将重要情报（技术趋势、安全漏洞）推送到 `memory/` 目录，CTO 自动同步到知识库。

### 方式 3：Git 同步
将知识库推送到 GitHub，其他成员可贡献知识，CTO 自动拉取更新。

## 🧠 CTO 学习机制
1. **启动时**：CTO 自动扫描 `docs/knowledge-base/` 目录，更新内部知识图谱。
2. **决策时**：优先检索本地知识库，再尝试外网搜索（如果可用）。
3. **反馈时**：将新学到的知识（如新发现的 Bug 修复方案）写回知识库。

## 📊 当前知识库状态
- **技术栈文档**: ✅ 已初始化 (Fastify, TypeScript)
- **最佳实践**: ✅ 已初始化 (代码审查、技术债务管理)
- **架构模式**: ✅ 已初始化 (微服务、事件驱动)
- **外部文档**: ⏳ 等待注入

## 🚀 下一步
- 请 CEO/CIO 注入重要技术文档。
- 或手动复制 Fastify/TypeScript 官方文档到此目录。

---
*本知识库是 CTO 持续进化的核心引擎。*
