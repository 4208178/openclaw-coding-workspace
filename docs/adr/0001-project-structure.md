# ADR 0001: 项目目录结构与基础架构选择

**状态**: 提议 (Proposed)  
**日期**: 2026-05-05  
**决策者**: CTO (蜜蜂)  
**批准者**: CEO (田螺)

## 上下文 (Context)

为了启动首个技术任务“项目初始化与架构设计验证”，我们需要确立一个清晰、可维护且符合工程标准的项目目录结构。该结构需支持：
1. **可扩展性**：能够容纳未来增长的业务逻辑。
2. **可测试性**：便于单元测试与集成测试的编写。
3. **协作效率**：支持多代理（架构师、开发者、测试）并行工作。

当前技术栈尚未最终确定，但需预留接口支持主流后端框架（Node.js/Express, Python/FastAPI, Go/Gin）。

## 决策 (Decision)

我们决定采用 **分层架构 (Layered Architecture)** 的目录结构，具体如下：

```
workspace-coding/
├── src/
│   ├── api/          # 接口层 (Controllers, Routes)
│   ├── core/         # 业务逻辑层 (Services, Domain Models)
│   └── utils/        # 工具函数 (Helpers, Constants)
├── tests/
│   ├── unit/         # 单元测试
│   └── integration/  # 集成测试
├── docs/
│   └── adr/          # 架构决策记录 (ADR)
├── config/           # 配置文件 (环境变量、数据库配置)
├── .gitignore
├── README.md
└── package.json | requirements.txt | go.mod (待定)
```

**技术栈选择原则**：
- **首选方案**：Node.js + Express (若项目侧重快速迭代与前端集成)。
- **备选方案**：Python + FastAPI (若项目侧重数据处理与 AI 集成)。
- **评估标准**：社区活跃度、类型安全、性能、学习成本。

## 理由 (Rationale)

1. **分层清晰**：`src/` 下的 `api`, `core`, `utils` 分离了关注点，便于维护。
2. **测试友好**：`tests/` 独立目录，支持 Jest/Pytest 等框架。
3. **文档规范**：`docs/adr/` 确保所有技术决策可追溯。
4. **灵活性**：目录结构不绑定具体语言，便于后续技术栈切换。

## 后果 (Consequences)

**正面**：
- 新成员可快速理解项目结构。
- 代码审查与测试流程标准化。
- 支持多代理协作，减少冲突。

**负面**：
- 初期需配置较多文件（如 `.gitignore`, `README.md`）。
- 若技术栈选择错误，需重构部分目录（但分层设计降低了重构成本）。

## 后续行动

1. 根据 CEO 确认的技术栈，初始化具体依赖（`package.json` 或 `requirements.txt`）。
2. 编写首个 API 接口示例（如 `GET /health`）。
3. 配置 CI/CD 流水线（GitHub Actions）。

---
*本 ADR 将随项目演进持续更新。*