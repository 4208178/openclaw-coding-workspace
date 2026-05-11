/**
 * 模块：趣味与老黄历
 * 数据源：lunar-javascript (本地黄历库)
 */

const axios = require('axios');
const { Lunar, Solar } = require('lunar-javascript');

// 引入外部数据库
const { jokes } = require('../data/jokes.js');
const { getAllReminders } = require('../data/reminders.js');

// 引入历史事件数据库
const { historicalEvents } = require('../data/historical-events.js');

// 每日知识
const dailyKnowledge = [
  { title: "番茄工作法", desc: "每25分钟工作+5分钟休息，提高专注力" },
  { title: "艾宾浩斯遗忘曲线", desc: "学习后及时复习，记忆效果最佳" },
  { title: "帕累托法则", desc: "80%的结果来自20%的努力" },
  { title: "第一性原理", desc: "从本质出发思考问题，而非类比" },
  { title: "复利效应", desc: "持续的小进步会产生巨大回报" },
  { title: "刻意练习", desc: "有目的的重复练习是精通的关键" },
  { title: "成长型思维", desc: "相信能力可以通过努力提升" },
  { title: "二八法则", desc: "用20%的时间创造80%的价值" },
  { title: "费曼学习法", desc: "用简单语言解释所学，检验理解程度" },
  { title: "PDCA循环", desc: "计划-执行-检查-改进，持续优化" }
];

// 随机选择
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 随机选择多个
function randomChoices(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// 获取老黄历数据
function getOldCalendar() {
  try {
    const today = Solar.fromDate(new Date());
    const lunar = today.getLunar();
    
    // 获取宜忌（各取前6条，避免过长）
    const yi = lunar.getDayYi().slice(0, 6);
    const ji = lunar.getDayJi().length > 0 ? lunar.getDayJi().slice(0, 6) : ['无'];
    
    // 尝试获取更多黄历信息
    let chong = '', sha = '';
    try {
      if (lunar.getDayChong) {
        chong = lunar.getDayChong().getDesc();
      }
    } catch (e) { chong = ''; }
    try {
      if (lunar.getDaySha) {
        sha = lunar.getDaySha();
      }
    } catch (e) { sha = ''; }
    
    return {
      lunarDate: lunar.toString(),  // 如: 二〇二六年三月廿五
      yi: yi,
      ji: ji,
      chong: chong,
      sha: sha,
      hasData: true
    };
  } catch (e) {
    console.log('⚠️ 黄历获取失败:', e.message);
    return null;
  }
}

// 获取当前日期
function getToday() {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    day: now.getDate()
  };
}

async function getFunModule(config) {
  const m = config.modules.fun;
  if (!m || !m.enabled) return null;
  
  const { month, day } = getToday();
  const dateKey = `${month}-${day}`;
  
  const result = { 
    title: '📅 今日老黄历', 
    items: [], 
    fetchTime: new Date().toLocaleTimeString('zh-CN') 
  };
  
  try {
    // 1. 老黄历（农历+宜忌）
    if (m.items && m.items.lunar) {
      const calendar = getOldCalendar();
      if (calendar) {
        result.items.push({
          type: 'lunar',
          text: `📅 农历: ${calendar.lunarDate}`,
          source: '老黄历'
        });
        
        // 只显示宜忌
        result.items.push({
          type: 'yi',
          text: `✅ 宜: ${calendar.yi.join('、')}`,
          source: '老黄历'
        });
        
        if (calendar.ji[0] !== '无') {
          result.items.push({
            type: 'ji',
            text: `❌ 忌: ${calendar.ji.join('、')}`,
            source: '老黄历'
          });
        }
      }
    }
    
    // 2. 历史上的今天
    if (m.items && m.items.history) {
      const events = historicalEvents[dateKey] || [];
      if (events.length > 0) {
        const event = randomChoice(events);
        result.items.push({
          type: 'history',
          text: `📜 历史上的今天: ${event.year}年 ${event.event}\n   ${event.desc}`,
          source: '历史数据库'
        });
      }
    }
    
    // 3. 每日知识
    if (m.items && m.items.knowledge) {
      const knowledge = randomChoice(dailyKnowledge);
      result.items.push({
        type: 'knowledge',
        text: `💡 ${knowledge.title}: ${knowledge.desc}`,
        source: '知识库'
      });
    }
    
    // 4. 温柔提醒 - 从外部数据库获取
    if (m.items && m.items.reminder) {
      const reminder = randomChoice(getAllReminders());
      result.items.push({
        type: 'reminder',
        text: `💝 ${reminder}`,
        source: '小蜜蜂的关怀'
      });
    }
    
    // 5. 每日笑话 - 从外部数据库获取
    if (m.items && m.items.joke) {
      const joke = randomChoice(jokes);
      result.items.push({
        type: 'joke',
        text: `😂 ${joke}`,
        source: '欢乐源泉'
      });
    }
    
    return result;
  } catch (err) {
    console.error('❌ 趣味模块错误:', err.message);
    return { 
      title: '📅 今日老黄历', 
      items: [{ type: 'error', text: '数据获取失败' }], 
      fetchTime: new Date().toLocaleTimeString('zh-CN') 
    };
  }
}

module.exports = { getFunModule, getOldCalendar, historicalEvents, dailyKnowledge, jokes, getAllReminders };
