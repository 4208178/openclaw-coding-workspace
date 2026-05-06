#!/usr/bin/env node
/**
 * 邮件发送脚本 (email-notification)
 * 用法: node send.js <subject> <contentPath> [--html] [--attach]
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// 配置
const SMTP_SERVER = process.env.SMTP_SERVER;
const SMTP_PORT = process.env.SMTP_PORT || '587';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'CTO Bot <noreply@openclaw.ai>';
const SMTP_TO = process.env.SMTP_TO;

if (!SMTP_SERVER || !SMTP_USER || !SMTP_PASS || !SMTP_TO) {
  console.error('❌ 错误：缺少 SMTP 环境变量。请设置 SMTP_SERVER, SMTP_USER, SMTP_PASS, SMTP_TO。');
  process.exit(1);
}

// 解析参数
const args = process.argv.slice(2);
const subject = args[0];
const contentPath = args[1];
const isHtml = args.includes('--html');
const isAttach = args.includes('--attach');

if (!subject || !contentPath) {
  console.error('❌ 用法：node send.js <subject> <contentPath> [--html] [--attach]');
  process.exit(1);
}

// 读取内容
let content = '';
let attachments = [];

try {
  if (isAttach && fs.existsSync(contentPath)) {
    attachments.push({
      filename: path.basename(contentPath),
      path: path.resolve(contentPath)
    });
    content = `请查看附件：${path.basename(contentPath)}`;
  } else if (fs.existsSync(contentPath)) {
    content = fs.readFileSync(contentPath, 'utf8');
  } else {
    content = contentPath; // 直接作为文本内容
  }
} catch (err) {
  console.error('❌ 读取内容失败:', err.message);
  process.exit(1);
}

// 构建 HTML
const htmlContent = isHtml ? content : `<pre>${content}</pre>`;
const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { background: #ecf0f1; padding: 10px; text-align: center; font-size: 12px; color: #7f8c8d; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏗️ 蜜蜂 CTO 报告</h1>
  </div>
  <div class="content">
    ${htmlContent}
  </div>
  <div class="footer">
    此邮件由 <strong>蜜蜂 CTO</strong> 自动发送 | ${new Date().toISOString()}
  </div>
</body>
</html>
`;

// 创建 transporter
const transporter = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: parseInt(SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// 发送邮件
const mailOptions = {
  from: SMTP_FROM,
  to: SMTP_TO,
  subject: `[CTO报告] ${subject}`,
  html: fullHtml,
  text: isHtml ? content : content, // 纯文本备份
  attachments
};

console.log('📧 正在发送邮件...');
console.log('  主题:', mailOptions.subject);
console.log('  收件人:', mailOptions.to);
console.log('  附件:', attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : '无');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ 邮件发送失败:', error.message);
    process.exit(1);
  } else {
    console.log('✅ 邮件发送成功:', info.messageId);
    console.log('   预览链接:', `https://webmail.example.com/#message/${info.messageId}`); // 占位符
  }
});