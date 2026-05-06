#!/bin/bash
# 代码审查助手 CLI 触发器
# 用法: ./review.sh [文件路径]

set -e

WORKSPACE="/home/myuser/.openclaw/workspace-coding"
cd "$WORKSPACE"

echo "🔍 开始代码审查..."

# 1. 静态分析
echo "📊 运行 ESLint..."
npx eslint --format json src/ > /tmp/eslint-report.json || true

# 2. 格式化检查
echo "🎨 运行 Prettier..."
npx prettier --check src/ > /tmp/prettier-report.txt || true

# 3. 单元测试
echo "🧪 运行 Jest..."
npx jest --coverage --silent || true

# 4. 生成报告
echo "📝 生成审查报告..."
cat << EOF
## 🛡️ 代码审查报告

### 静态分析
- ESLint 结果：\$(cat /tmp/eslint-report.json | jq '.results | length') 个问题
- Prettier 结果：\$(cat /tmp/prettier-report.txt | grep -c "Mismatch" || echo "0") 个格式错误

### 测试覆盖率
- 覆盖率：\$(cat coverage/summary.json | jq '.total.lines.pct')%

### 建议
- 修复 ESLint 错误
- 补充单元测试，目标覆盖率 > 80%
- 确保代码风格统一

EOF

echo "✅ 审查完成。"