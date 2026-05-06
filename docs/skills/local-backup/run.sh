#!/bin/bash
# 本地备份技能 (local-backup)
# 用法: ./run.sh [备份目录] [保留天数]
# 默认：备份 workspace-coding，保留 7 天

set -e

WORKSPACE="/home/myuser/.openclaw/workspace-coding"
BACKUP_DIR="${1:-$WORKSPACE}"
RETENTION_DAYS="${2:-7}"
BACKUP_ROOT="$HOME/.openclaw/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_ROOT/backup_${TIMESTAMP}.tar.gz"

# 创建备份目录
mkdir -p "$BACKUP_ROOT"

echo "🔒 开始备份: $BACKUP_DIR"
echo "📦 目标文件：$BACKUP_FILE"

# 执行备份
tar -czf "$BACKUP_FILE" -C "$(dirname "$BACKUP_DIR")" "$(basename "$BACKUP_DIR")"

# 清理旧备份
echo "🧹 清理 $RETENTION_DAYS 天前的备份..."
find "$BACKUP_ROOT" -name "backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "✅ 备份完成: $BACKUP_FILE"
echo "📊 备份大小: $(du -h "$BACKUP_FILE" | cut -f1)"

# 可选：发送通知（当前未启用，需配置 SMTP）
# if [ -n "$SMTP_SERVER" ]; then
#   echo "📧 发送邮件通知..."
#   # 调用 email-notification 技能
# fi