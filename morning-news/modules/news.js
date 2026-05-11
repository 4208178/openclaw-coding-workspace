/**
 * 模块：新闻与热搜 - 真实数据版
 * 数据源：抖音热榜（实时）+ 少数派 + Hacker News
 */

const axios = require('axios');

// 中文科技新闻 - 少数派 RSS（带时间过滤）
async function getChineseTechNews() {
  try {
    const { data } = await axios.get(
      'https://api.rss2json.com/v1/api.json?rss_url=https://sspai.com/feed',
      { timeout: 10000 }
    );
    
    if (data?.status === 'ok' && data?.items) {
      // 解析时间并过滤24小时内新闻
      const now = Date.now();
      const dayAgo = now - 24 * 60 * 60 * 1000;
      
      const freshNews = [];
      for (const item of data.items) {
        const pubTime = new Date(item.pubDate).getTime();
        if (pubTime > dayAgo) {
          freshNews.push({
            num: freshNews.length + 1,
            title: item.title,
            url: item.link,
            pubDate: item.pubDate,
            hoursAgo: Math.round((now - pubTime) / (1000 * 60 * 60) * 10) / 10
          });
        }
        if (freshNews.length >= 5) break;
      }
      
      return {
        news: freshNews,
        time: new Date().toLocaleTimeString('zh-CN'),
        source: '少数派'
      };
    }
  } catch (e) {
    console.log('⚠️ 少数派 RSS 失败:', e.message);
  }
  return null;
}

// Hacker News（带时间过滤）
async function getHackerNews() {
  try {
    const { data: storyIds } = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
      { timeout: 15000 }
    );
    
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    
    // 获取详情并过滤
    const topStories = await Promise.all(
      storyIds.slice(0, 20).map(id => 
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { timeout: 8000 })
          .then(r => r.data)
          .catch(() => null)
      )
    );
    
    const freshNews = [];
    for (const s of topStories) {
      if (s && s.title && s.time * 1000 > dayAgo) {
        freshNews.push({
          num: freshNews.length + 1,
          title: s.title,
          url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
          hoursAgo: Math.round((now - s.time * 1000) / (1000 * 60 * 60) * 10) / 10
        });
      }
      if (freshNews.length >= 5) break;
    }
    
    return { 
      news: freshNews, 
      time: new Date().toLocaleTimeString('zh-CN'), 
      source: 'Hacker News' 
    };
  } catch (e) {
    console.log('⚠️ HN API 失败:', e.message);
    return null;
  }
}

// 抖音热榜 - 真实数据
async function getDouyinHot() {
  try {
    const { data } = await axios.get(
      'https://www.douyin.com/aweme/v1/hot/search/list/',
      { 
        timeout: 10000,
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.douyin.com/'
        }
      }
    );
    
    if (data?.data?.word_list) {
      const topics = data.data.word_list.slice(0, 8).map((item, i) => ({
        num: i + 1,
        word: item.word,
        hot: item.hot_value || item.hot
      }));
      
      return {
        topics: topics,
        time: new Date().toLocaleTimeString('zh-CN'),
        source: '抖音热榜 (实时)'
      };
    }
  } catch (e) {
    console.log('⚠️ 抖音热榜失败:', e.message);
  }
  return null;
}

async function getNewsModule(config) {
  const m = config.modules.news;
  if (!m || !m.enabled) return null;
  
  const result = { title: '📰 速递', items: [], fetchTime: new Date().toLocaleTimeString('zh-CN') };
  
  try {
    const [tech, douyin, hn] = await Promise.all([
      getChineseTechNews(),
      getDouyinHot(),
      getHackerNews()
    ]);
    
    // 中文科技新闻 - 过滤后
    if (tech && tech.news.length > 0) {
      const list = tech.news.map(n => 
        `${n.num}. ${n.title} (${n.hoursAgo}h)\n   🔗 ${n.url}`
      ).join('\n   ');
      result.items.push({
        type: 'tech',
        text: `📱 科技要闻 (${tech.time}, 24小时内):\n   ${list}`,
        source: tech.source
      });
    } else {
      result.items.push({
        type: 'tech',
        text: `📱 科技要闻: 暂无24小时内更新`,
        source: '少数派'
      });
    }
    
    // 抖音热榜 - 真实数据
    if (douyin && douyin.topics && douyin.topics.length > 0) {
      const list = douyin.topics.map(t => `${t.num}. #${t.word}#`).join(' | ');
      result.items.push({
        type: 'douyin',
        text: `🔥 抖音热榜 (${douyin.time}): ${list}`,
        source: douyin.source
      });
    }
    
    // Hacker News - 过滤后
    if (hn && hn.news.length > 0) {
      const list = hn.news.map(n => 
        `${n.num}. ${n.title} (${n.hoursAgo}h)\n   🔗 ${n.url}`
      ).join('\n   ');
      result.items.push({
        type: 'hacker',
        text: `💻 HN热门 (${hn.time}, 24小时内):\n   ${list}`,
        source: hn.source
      });
    } else {
      result.items.push({
        type: 'hacker',
        text: `💻 HN热门: 暂无24小时内更新`,
        source: 'Hacker News'
      });
    }
    
    return result;
  } catch (err) {
    console.error('❌ 新闻模块错误:', err.message);
    return { title: '📰 速递', items: [{ type: 'error', text: '数据获取失败' }], fetchTime: new Date().toLocaleTimeString('zh-CN') };
  }
}

module.exports = { getNewsModule, getHackerNews, getChineseTechNews, getDouyinHot };