# 技能：本地备份 (local-backup)

**角色**: CTO (蜜蜂)  
**目的**: 自动备份工作区，防止数据丢失。  
**触发**: 手动调用 (`./run.sh`) 或 `cron` 每日自动执行。

## 核心逻辑
1. **压缩备份**: 使用 `tar` + `gzip` 压缩指定目录。
2. **时间戳命名**: 备份文件包含时间戳，便于版本管理。
3. **自动清理**: 删除超过指定天数（默认 7 天）的旧备份。
4. **可选通知**: 支持邮件/Slack 通知（当前未启用，需配置 SMTP）。

## 用法
```bash
# 备份整个 workspace-coding
./docs/skills/local-backup/run.sh

# 备份指定目录，保留 14 天
./docs/skills/local-backup/run.sh /path/to/dir 14
```

## 配置
- **备份根目录**: `~/.openclaw/backups`
- **默认保留天数**: 7 天
- **通知**: 未启用（需配置 `SMTP_SERVER`, `SMTP_USER`, `SMTP_PASS`）

## 集成到 Cron
```bash
# 每日凌晨 2 点自动备份
0 2 * * * /home/myuser/.openclaw/workspace-coding/docs/skills/local-backup/run.sh
```

---
*此技能改编自 `~/.openclaw/workspace/skills/local-backup/`，适配当前环境。*