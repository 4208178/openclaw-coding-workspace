=== 审查技能：local-backup ===
# 本地备份技能 (local-backup)

## 用途
提供本地文件/目录的自动化备份功能，支持：
- 定时备份关键项目
- 增量备份与全量备份
- 压缩与加密
- 备份历史管理

## 使用方法

### 基础备份
```bash
# 备份指定目录到备份目录
local-backup backup <source> <dest> [--compress] [--encrypt]
```

### 定时备份
```bash
# 每天凌晨2点备份项目目录

=== 审查技能：email-notification ===
---
name: email-notification
description: Send emails via SMTP using Python scripts. Use when you need to send reports, notifications, or alerts via email. Supports QQ email and other SMTP providers with authentication.
---

# Email Notification Skill

Send emails via SMTP using Python scripts. This skill provides a reliable way to send reports, notifications, and alerts through email.

## When to Use This Skill

Use this skill when:
- You need to send self-check reports or analysis results via email
- You want to notify yourself about completed tasks or system status
- You need to send automated alerts or reminders
- You have SMTP credentials configured (like QQ email authorization code)

## Core Workflow

### 1. Prepare Content

=== 审查技能：windows-bridge ===
---
name: windows-bridge
description: 打通 WSL 与 Windows 节点的桥接技能。使用 powershell.exe 作为“翻译官”，让运行在 WSL 中的 OpenClaw 能够直接控制 Windows 程序（如浏览器、记事本等）。适用于 WSL2 镜像模式网络环境。
---

# Windows 桥接技能 (Windows Bridge Skill)

**核心原理**：利用 WSL2 的 `powershell.exe` 作为“翻译官”，将 Linux 命令转换为 Windows 可执行的命令。

## 当且仅当以下情况使用此技能

- 需要打开 Windows 程序（如浏览器、记事本、Excel 等）
- 需要控制 Windows 桌面应用（UI 自动化）
- 需要访问 Windows 文件系统（通过 `powershell.exe` 调用）
- 需要在 WSL 中测试 Windows 网络服务

## 核心命令

### 1. 打开程序
```bash

=== 审查技能：handsfree-windows-control ===
---
name: handsfree-windows-control
description: "Guide skill for controlling native Windows apps (UIA) and web browsers (Playwright) via the handsfree-windows CLI. Use when you need to automate or test desktop applications or websites on a Windows machine: launching apps from Start menu, discovering UI controls without guessing, clicking/typing in native apps, opening/snapshotting/clicking in browsers, recording and replaying YAML macros that mix desktop and web steps. REQUIRES handsfree-windows CLI (auto-installed on first use via setup.py)."
---

# Handsfree Windows Control

A guide skill for automating native Windows apps (UIA) and web browsers (Playwright)
via the `handsfree-windows` CLI.

## First use: auto-setup

On first use, run setup before issuing any other commands:

```powershell
python scripts/setup.py
```

This will:
1. Clone `handsfree-windows` from GitHub into `~/.handsfree-windows/cli/` (public repo, read-only)

=== 审查技能：elite-longterm-memory ===
---
name: elite-longterm-memory
version: 1.2.3
description: "Ultimate AI agent memory system for Cursor, Claude, ChatGPT & Copilot. WAL protocol + vector search + git-notes + cloud backup. Never lose context again. Vibe-coding ready."
author: NextFrontierBuilds
keywords: [memory, ai-agent, ai-coding, long-term-memory, vector-search, lancedb, git-notes, wal, persistent-context, claude, claude-code, gpt, chatgpt, cursor, copilot, github-copilot, openclaw, moltbot, vibe-coding, agentic, ai-tools, developer-tools, devtools, typescript, llm, automation]
metadata:
  openclaw:
    emoji: "🧠"
    requires:
      env:
        - OPENAI_API_KEY
      plugins:
        - memory-lancedb
---

# Elite Longterm Memory 🧠

**The ultimate memory system for AI agents.** Combines 6 proven approaches into one bulletproof architecture.


=== 审查技能：evolution-engine ===
# 进化引擎技能 (Evolution Engine Skill)

**描述**: 自动检测错误、生成优化策略、应用改进并验证效果的自我进化系统。

**触发方式**: `/evolution` 或后台自动运行（cron/heartbeat）。

**功能**:
1. **错误检测**: 扫描最近日志，识别重复错误模式。
2. **策略生成**: 基于错误类型和技能使用情况，生成优化建议。
3. **自动应用**: 安全修改记忆文件（`memory/`, `MEMORY.md`），自动 Git 提交。
4. **验证闭环**: 运行测试用例，输出进化效果报告。
5. **用户通知**: 进化完成后发送摘要报告。

**配置**:
- 运行频率: 每日 02:00 (可配置)。
- 错误阈值: 重复 3 次以上触发进化。
- 通知渠道: 微信/邮件（需配置）。

**依赖**:
- `evolution_engine.py` (核心引擎)。

=== 审查技能：xiucheng-self-improving-agent ===
---
name: self-improving-agent
description: Self-improving agent system that analyzes conversation quality, identifies improvement opportunities, and continuously optimizes response strategies.
version: "1.0.0"
author: xiucheng
type: skill
tags: [self-improvement, learning, optimization, reflection, growth]
homepage: https://github.com/xiucheng/self-improving-agent
license: MIT
---

# Self-Improving Agent

An intelligent self-improvement system for OpenClaw agents that analyzes conversation quality and continuously optimizes performance.

## Features

- 📊 **Quality Analysis**: Evaluates conversation effectiveness
- 🎯 **Improvement Tracking**: Identifies areas for enhancement
- 📝 **Learning Log**: Records insights and lessons learned

