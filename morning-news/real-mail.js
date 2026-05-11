const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: { user: '4208178@qq.com', pass: 'pvbsaudtwasobhei' }
});

transporter.sendMail({
  from: '4208178@qq.com',
  to: '4208178@qq.com',
  subject: '🌞 真实测试晨报',
  text: '今日北京：24℃，多云，湿度 65%。第一次真实投递！',
  html: '<pre>北京晨报原型 v1.0
🌅 天气：24℃ 多云
💧 湿度：65%
🔔 原型邮件已发出！</pre>'
}, (err, info) => {
  if (err) console.error('❌ 失败', err);
  else console.log('✅ 成功，MessageId：', info.messageId);
});