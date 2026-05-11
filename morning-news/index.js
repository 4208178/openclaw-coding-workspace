/**
 * 晨间速递 Morning News Bot v2.0.0
 * 模块化、可配置的晨间新闻/天气推送机器人
 * 
 * 支持:
 * - REST API 服务 (v2.0.0)
 * - SQLite 数据库存储
 * - 定时推送
 */

const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const config = require('./config');
const { getWeatherModule } = require('./modules/weather');
const { getPremarketModule } = require('./modules/premarket');
const { getFunModule } = require('./modules/fun');
const { getNewsModule } = require('./modules/news');
const db = require('./src/database');

const VERSION = '2.0.0';

// ============ 邮件推送 ============
async function sendEmail(content) {
  if (!config.push.email.enabled) {
    console.log('📧 邮件推送已关闭');
    return null;
  }
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: config.push.email.from || config.push.email.to,
      pass: process.env.EMAIL_PASSWORD || 'pvbsaudtwasobhei'
    }
  });
  
  try {
    const result = await transporter.sendMail({
      from: config.push.email.from || config.push.email.to,
      to: config.push.email.to,
      subject: `🌅 晨间速递 v${VERSION} - ${new Date().toLocaleDateString('zh-CN')}`,
      text: content
    });
    
    console.log('✅ 邮件发送成功:', result.messageId);
    return result;
  } catch (err) {
    console.error('❌ 邮件发送失败:', err.message);
    return null;
  }
}

// ============ 微信推送 ============
async function sendWeChat(content) {
  if (!config.push.wechat.enabled || !config.push.wechat.webhook) {
    return null;
  }
  
  try {
    const { data } = await axios.post(config.push.wechat.webhook, {
      msgtype: 'text',
      text: { content: content }
    });
    
    if (data.errcode === 0) {
      console.log('✅ 微信推送成功');
    }
    return data;
  } catch (err) {
    console.error('❌ 微信推送错误:', err.message);
    return null;
  }
}

// ============ 构建晨报内容 ============
async function buildMorningNews() {
  const sections = [];
  const now = new Date();
  const dateStr = now.toLocaleDateString('zh-CN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const fetchTime = now.toLocaleTimeString('zh-CN');
  
  sections.push(`🌅 早安 · ${dateStr}`);
  sections.push(`📋 版本: v${VERSION} | 数据获取时间: ${fetchTime}`);
  sections.push('='.repeat(40));
  
  console.log('📡 正在获取各个模块数据...');
  
  // 1. 天气模块
  console.log('  ☁️ 获取天气数据...');
  const weather = await getWeatherModule(config);
  if (weather) {
    sections.push(`\n${weather.title} [${weather.fetchTime || fetchTime}]`);
    weather.items.forEach(item => {
      sections.push(item.text);
    });
  }
  
  // 2. 盘前模块
  console.log('  📈 获取盘前数据...');
  const premarket = await getPremarketModule(config);
  if (premarket) {
    sections.push(`\n${premarket.title} [${premarket.fetchTime || fetchTime}]`);
    premarket.items.forEach(item => {
      sections.push(item.text + (item.source ? ` (${item.source})` : ''));
    });
  }
  
  // 3. 新闻模块
  console.log('  📰 获取新闻数据...');
  const news = await getNewsModule(config);
  if (news) {
    sections.push(`\n${news.title} [${news.fetchTime || fetchTime}]`);
    news.items.forEach(item => {
      sections.push(item.text);
    });
  }
  
  // 4. 趣味模块
  console.log('  💡 获取趣味数据...');
  const fun = await getFunModule(config);
  if (fun) {
    sections.push(`\n${fun.title}`);
    fun.items.forEach(item => {
      sections.push(item.text);
    });
  }
  
  sections.push('\n' + '='.repeat(40));
  sections.push(`⏰ 生成时间: ${now.toLocaleString('zh-CN')}`);
  sections.push(`🤖 晨间速递 v${VERSION} - 蜜蜂CTO`);
  
  return sections.join('\n');
}

// ============ 主任务 ============
async function runMorningTask() {
  const now = new Date();
  console.log(`\n🕐 [${now.toLocaleString()}] 晨间速递 v${VERSION} 开始执行...`);
  
  try {
    const content = await buildMorningNews();
    console.log('\n📝 晨报内容预览:');
    console.log('-'.repeat(40));
    console.log(content.substring(0, 800) + '...');
    console.log('-'.repeat(40));
    
    // 发送邮件
    await sendEmail(content);
    
    // 发送微信
    await sendWeChat(content);
    
    // 保存到数据库
    const today = now.toISOString().split('T')[0];
    const reportData = {
      version: VERSION,
      weather: await getWeatherModule(config),
      premarket: await getPremarketModule(config),
      news: await getNewsModule(config),
      fun: await getFunModule(config)
    };
    db.saveReport(today, reportData);
    console.log('💾 晨报已保存到数据库');
    
    console.log(`\n✅ 任务完成\n`);
  } catch (err) {
    console.error('❌ 任务执行失败:', err.message);
  }
}

// ============ 启动 ============
console.log('='.repeat(50));
console.log(`🌟 晨间速递 Bot v${VERSION} 启动`);
console.log('='.repeat(50));
console.log(`📅 定时任务: ${config.schedule.cron}`);
console.log(`📧 邮件推送: ${config.push.email.enabled ? '开启' : '关闭'}`);
console.log(`💬 微信推送: ${config.push.wechat.enabled ? '开启' : '关闭'}`);

// 立即执行一次（测试）
runMorningTask();

// 启动定时任务
cron.schedule(config.schedule.cron, runMorningTask);

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n👋 Bot 已停止');
  process.exit(0);
});