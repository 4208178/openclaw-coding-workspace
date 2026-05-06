# 技术卡片 001: Node.js + Fastify 架构模式

**类型**: tech-card  
**角色**: cto  
**状态**: approved  
**日期**: 2026-05-06

## 概述
本文档记录 Node.js + Fastify 架构的最佳实践与决策依据。

## 核心优势
1. **高性能**：Fastify 比 Express 快 2-3 倍（官方基准测试）。
2. **类型安全**：原生 TypeScript 支持，减少运行时错误。
3. **插件生态**：`@fastify/autoload` 支持模块化路由。
4. **低开销**：事件驱动架构，适合 I/O 密集型服务。

## 适用场景
- API 服务（REST/GraphQL）
- 微服务网关
- 实时数据处理
- 高并发场景

## 反模式
- ❌ 避免在 Fastify 中使用同步阻塞操作。
- ❌ 避免过度使用中间件（优先使用插件）。
- ❌ 避免手动管理连接池（使用 Fastify 内置池）。

## 参考
- [Fastify 官方文档](https://fastify.io)
- [TypeScript 最佳实践](https://www.typescriptlang.org/docs/)

---
*此技术卡片已提交到 Git-Notes (refs/notes/shared-decisions)*
