# 技能：邮件通知 (email-notification)

**角色**: CTO (蜜蜂)  
**目的**: 发送 HTML 邮件通知，支持附件、模板化内容。  
**触发**: 手动调用 (`./send.js`) 或脚本集成。

## 核心逻辑
1. **SMTP 配置**: 从环境变量读取 `SMTP_SERVER`, `SMTP_USER`, `SMTP_PASS`, `SMTP_PORT`。
2. **HTML 模板**: 支持自定义 HTML 内容，自动添加 CTO 签名。
3. **附件支持**: 可选附加文件（如 PDF 报告、日志）。
4. **错误处理**: 发送失败时记录日志，不阻塞主流程。

## 用法
```bash
# 发送简单文本邮件
node ./docs/skills/email-notification/send.js "测试邮件" "这是测试内容"

# 发送 HTML 报告（带附件）
node ./docs/skills/email-notification/send.js "技能审查报告" "docs/knowledge-base/external/skill-review-report.md" --html --attach
```

## 环境变量配置
必须在运行前设置以下环境变量（推荐写入 `~/.openclaw/.env`）：
```bash
export SMTP_SERVER="smtp.example.com"
export SMTP_PORT="587"
export SMTP_USER="your_email@example.com"
export SMTP_PASS="your_app_password"
export SMTP_FROM="CTO Bot <your_email@example.com>"
export SMTP_TO="ceo@example.com"  # CEO 邮箱
```

## 依赖
- `nodemailer`: 发送邮件的核心库。
- `html-to-text`: 可选，生成纯文本备份。

## 集成场景
- **每日报告**: 自动发送 `memory/YYYY-MM-DD.md` 摘要。
- **技能审查**: 发送审查报告（如本次）。
- **警报通知**: 技术债务超标、性能回归时发送警报。

---
*此技能改编自 `~/.openclaw/workspace/skills/email-notification/`，适配 Node.js + Fastify 环境。*