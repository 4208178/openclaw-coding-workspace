const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// ============ 配置区域 ============
const CONFIG = {
  // 天气数据源（wttr.in 免费无需 Key）
  WEATHER_URL: 'https://wttr.in/Beijing?format=j1',
  
  // 邮件配置（你的 QQ 邮箱）
  EMAIL: {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: { user: '4208178@qq.com', pass: 'pvbsaudtwasobhei' }
  },
  
  // 企业微信机器人 Webhook（替换为你真实的 Webhook URL）
  // 格式：https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxx-xxxxx-xxxxx
  WECHAT_WEBHOOK: process.env.WECHAT_WEBHOOK || 'YOUR_WEBHOOK_URL_HERE'
};

// ============ 天气数据获取 ============
async function fetchWeather() {
  try {
    const { data } = await axios.get(CONFIG.WEATHER_URL);
    const w = data.current_condition[0];
    return {
      temp: w.temp_C,
      weather: w.weatherDesc[0].value,
      humidity: w.humidity,
      wind: w.windspeedKmph,
      time: w.localObsDateTime
    };
  } catch (err) {
    console.error('❌ 获取天气失败:', err.message);
    return null;
  }
}

// ============ 邮件推送 ============
async function sendEmail(weather) {
  const transporter = nodemailer.createTransport(CONFIG.EMAIL);
  
  const msg = `🌅 晨间速递 ${new Date().toLocaleDateString('zh-CN')}

📍 北京实时天气：
🌡️ 温度：${weather.temp}°C
☁️ 天气：${weather.weather}
💧 湿度：${weather.humidity}%
🌬️ 风速：${weather.wind} km/h
⏰ 更新时间：${weather.time}

📊 自动发送 - Phase 2 定时任务运行中 ✅`;

  const result = await transporter.sendMail({
    from: '4208178@qq.com',
    to: '4208178@qq.com',
    subject: `🌞 晨间速递 - ${new Date().toLocaleDateString('zh-CN')}`,
    text: msg
  });
  
  console.log('✅ 邮件发送成功:', result.messageId);
  return result;
}

// ============ 企业微信推送 ============
async function sendWeChat(weather) {
  if (CONFIG.WECHAT_WEBHOOK === 'YOUR_WEBHOOK_URL_HERE') {
    console.log('⚠️ 企业微信 Webhook 未配置，跳过微信推送');
    return null;
  }
  
  const text = `🌅 晨间速递 ${new Date().toLocaleDateString('zh-CN')}

📍 北京：${weather.weather} ${weather.temp}°C
💧 湿度：${weather.humidity}%
🌬️ 风速：${weather.wind} km/h

⏰ 自动发送`;
  
  try {
    const { data } = await axios.post(CONFIG.WECHAT_WEBHOOK, {
      msgtype: 'text',
      text: { content: text }
    });
    
    if (data.errcode === 0) {
      console.log('✅ 微信推送成功');
    } else {
      console.log('❌ 微信推送失败:', data.errmsg);
    }
    return data;
  } catch (err) {
    console.error('❌ 微信推送错误:', err.message);
    return null;
  }
}

// ============ 主任务 ============
async function runMorningTask() {
  console.log(`\n⏰ [${new Date().toLocaleString()}] 开始执行晨间任务…`);
  
  const weather = await fetchWeather();
  if (!weather) {
    console.log('❌ 天气获取失败，跳过发送');
    return;
  }
  
  console.log('📍 天气数据:', weather);
  
  // 发送邮件
  await sendEmail(weather);
  
  // 发送微信（如果配置了）
  await sendWeChat(weather);
  
  console.log('✅ 今日晨间任务完成\n');
}

// ============ 定时任务 ============
// 每天 7:45 执行
// cron.schedule('45 7 * * *', runMorningTask);

// 测试模式：每分钟执行一次
cron.schedule('* * * * *', runMorningTask);

console.log('🔔 Phase 2 晨间速递 Bot 已启动');
console.log('📅 定时任务：每分钟执行一次（测试模式）');
console.log('⏱️ 如需改为每日 7:45，请修改 cron.schedule 参数');
console.log('📝 企业微信 Webhook 未配置，邮件推送正常');

// 立即执行一次
runMorningTask();