const axios = require('axios');
const nodemailer = require('nodemailer');

console.log('🌐 正在拉取北京实时天气…');

axios.get('https://wttr.in/Beijing?format=j1').then(res => {
  const w = res.data.current_condition[0];
  
  const msg = `🌅 晨间速递 ${new Date().toLocaleDateString('zh-CN')}

📍 北京实时天气：
🌡️ 温度：${w.temp_C}°C
☁️ 天气：${w.weatherDesc[0].value}
💧 湿度：${w.humidity}%
🌬️ 风速：${w.windspeedKmph} km/h
⏰ 更新时间：${w.localObsDateTime}

📊 Phase 1 数据源测试完成 ✅`;

  console.log('📝 邮件内容：\n' + msg);

  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: { user: '4208178@qq.com', pass: 'pvbsaudtwasobhei' }
  });

  return transporter.sendMail({
    from: '4208178@qq.com',
    to: '4208178@qq.com',
    subject: '🌞 Phase 1 真实天气晨报 - ' + new Date().toLocaleDateString('zh-CN'),
    text: msg
  });
}).then(info => {
  console.log('✅ 邮件发送成功！');
  console.log('MessageId:', info.messageId);
  console.log('📡 数据源：wttr.in (实时天气)');
}).catch(err => {
  console.error('❌ 错误:', err.message);
});