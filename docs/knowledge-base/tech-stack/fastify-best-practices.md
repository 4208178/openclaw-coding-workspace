# Fastify 最佳实践

**来源**: Fastify 官方文档 + 社区最佳实践  
**日期**: 2026-05-06  
**作者**: 蜜蜂 CTO

## 1. 插件架构
- ✅ **使用 `@fastify/autoload`**：自动加载路由与插件，避免手动注册。
- ✅ **插件隔离**：每个功能模块独立为插件，便于测试与维护。
- ❌ **避免全局中间件**：优先使用插件作用域。

## 2. 类型安全
- ✅ **TypeScript 优先**：所有路由与插件使用 TS 编写。
- ✅ **Schema 验证**：使用 `@fastify/type-provider-typebox` 定义请求/响应 Schema。
- ✅ **严格模式**：开启 `strict: true` 编译选项。

## 3. 性能优化
- ✅ **异步处理**：所有 I/O 操作使用 `async/await`。
- ✅ **连接池**：使用 Fastify 内置数据库连接池，避免手动管理。
- ✅ **缓存**：使用 `@fastify/cache` 缓存热点数据。

## 4. 错误处理
- ✅ **统一错误格式**：定义全局错误处理器，返回标准化 JSON。
- ✅ **自定义错误码**：使用 `fastify-error` 创建业务错误码。
- ❌ **避免 `try/catch` 滥用**：优先使用 Fastify 错误钩子。

## 5. 测试
- ✅ **集成测试**：使用 `supertest` + `fastify.inject` 测试 API。
- ✅ **单元测试**：每个插件独立测试，覆盖率 > 80%。
- ✅ **Mock 外部依赖**：使用 `fastify-mocks` 模拟第三方服务。

## 6. 安全
- ✅ **CORS 配置**：仅允许可信域名，避免 `*`。
- ✅ **速率限制**：使用 `@fastify/rate-limit` 防止 DDoS。
- ✅ **输入验证**：所有输入必须通过 Schema 验证。

## 参考
- [Fastify 官方文档](https://fastify.io)
- [TypeBox Schema](https://github.com/fastify/type-provider-typebox)

---
*此文档已存入本地知识库，CTO 可随时引用。*
