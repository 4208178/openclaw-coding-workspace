/**
 * 晨间速递 Morning News Bot
 * 版本: 1.0.0
 * 作者: 蜜蜂CTO
 * 描述: 模块化、可配置的晨间新闻/天气推送机器人
 */

module.exports = {
  // ==================== 版本信息 ====================
  version: '1.0.0',
  name: 'morning-news-bot',
  author: '蜜蜂CTO',
  
  // ==================== 基本信息 ====================
  city: 'Beijing',           // 城市（用于天气）
  cityCN: '北京',            // 中文城市名
  
  // ==================== 模块开关 ====================
  modules: {
    // 盘前与预期
    premarket: {
      enabled: true,
      items: {
        exchange: true,    // 美元/人民币
        china: true,       // A股指数（上证/深证/创业板/沪深300）
        us: true,          // 美股（纳斯达克/道琼斯/标普）
        hk: true,          // 港股（腾讯/阿里/小米）
        a50: true,         // A50期货
        japan: true,       // 日经225
      }
    },
    
    // 新闻与热搜
    news: {
      enabled: true,
      items: {
        hacker: true,      // Hacker News
        rss: true,         // RSS 订阅
        weibo: true,       // 微博热搜
        finance: true,     // 财经新闻
        world: true,       // 国际新闻
      }
    },
    
    // 天气与决策
    weather: {
      enabled: true,
      items: {
        basic: true,         // 基础天气
        aqi: true,           // 空气质量
        clothing: true,      // 穿衣建议
        travel: true,        // 出行建议
      }
    },
    
    // 城市服务
    cityServices: {
      enabled: true,
      items: {
        restrictions: true,  // 限行尾号
      }
    },
    
    // 个人效率
    personal: {
      enabled: false,
      items: {
        knowledge: true,     // 每日知识
      }
    },
    
    // 趣味模块
    fun: {
      enabled: true,
      items: {
        history: true,       // 历史上的今天
        lunar: true,         // 老黄历（农历+宜忌）
        knowledge: true,     // 每日知识
        reminder: true,      // 温柔提醒
        joke: true,          // 每日笑话
      }
    }
  },
  
  // ==================== 推送配置 ====================
  push: {
    email: {
      enabled: true,
      to: process.env.EMAIL_TO || '4208178@qq.com',
      from: process.env.SMTP_USER || '4208178@qq.com'
    },
    wechat: {
      enabled: !!process.env.WECHAT_WEBHOOK,
      webhook: process.env.WECHAT_WEBHOOK || ''
    }
  },
  
  // ==================== 定时任务 ====================
  schedule: {
    // cron: '*/5 * * * *',     // 每5分钟（测试用）
    cron: '0 9 * * *',    // 每日 9:00（生产）
  },
  
  // ==================== 数据源配置 ====================
  sources: {
    weather: 'wttr.in',
    forex: 'exchangerate.host',
  }
};