const axios = require('axios');
const nodemailer = require('nodemailer');

console.log('🔛 正在拉取实时天气…');

axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
  params: { key: '79dcd0c1d2c2ad7b7800ce75aa630ef8', city: '110000' }
}).then(res => {
  const w = res.data.lives[0];
  const msg = `🌅 晨报现测 ${new Date().toLocaleString('zh-CN')}
📍 北京：${w.weather} ${w.temperature}℃，湿度${w.humidity}%，风${w.windpower}
🥞 原码在后，30 秒到！
`;
  console.log('📝 内容：\n' + msg);

  const trans = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {user:'4208178@qq.com',pass:'pvbsaudtwasobhei'}
  });

  return trans.sendMail({
    from: '4208178@qq.com',
    to: '4208178@qq.com',
    subject: '🔔 晨间实时报',
    text: msg
  });
}).then(info => {
  console.log('✅ 已投！', info.messageId);
}).catch(console.error);