const nodemailer = require('nodemailer');

console.log('🚀 开始发送邮件...');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '4208178@qq.com',
    pass: 'pvbsaudtwasobhei'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP 连接失败:', error.message);
    console.error('完整错误:', error);
    process.exit(1);
  }
  console.log('✅ SMTP 连接成功');

  const result = transporter.sendMail({
    from: '4208178@qq.com',
    to: '4208178@qq.com',
    subject: '🌞 晨报真实测试 - 2026-05-10',
    text: '测试成功！这是真实的邮件投递。\n' + 
          '北京天气：24℃，多云，湿度 65%。\n' + 
          '发送时间：' + new Date().toLocaleString('zh-CN'),
    html: '<h3>🌞 晨报真实测试</h3><p>这是真实的邮件投递验证。</p><p><strong>北京天气：</strong>24℃，多云，湿度 65%</p><p><em>发送时间：' + new Date().toLocaleString('zh-CN') + '</em></p>'
  });

  result.then(info => {
    console.log('✅ 邮件发送成功！');
    console.log('MessageId:', info.messageId);
    console.log('envelope:', JSON.stringify(info.envelope));
    console.log('时间段:', info.accepted, info.rejected);
    console.log('🏁 任务结束 - 请检查收件箱');
    process.exit(0);
  }).catch(err => {
    console.error('❌ 发送失败:', err.message);
    console.error('完整错误:', err);
    process.exit(1);
  });
});