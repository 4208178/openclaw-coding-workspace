/**
 * 模块：盘前风向标
 * 覆盖：汇率、A股、美股、港股、日经、A50期货
 */

const axios = require('axios');

// 解析新浪股票数据（处理编码问题）
function parseSinaStock(code, type = 'stock') {
  return new Promise(async (resolve) => {
    try {
      const { data } = await axios.get(
        `https://hq.sinajs.cn/list=${code}`,
        { 
          timeout: 10000,
          headers: { 'Referer': 'https://finance.sina.com.cn' }
        }
      );
      
      const match = data.match(/="([^"]*)"/);
      if (!match || !match[1]) return resolve(null);
      
      const parts = match[1].split(',');
      if (parts.length < 3) return resolve(null);
      
      let name, price, change, pctChange;
      
      if (type === 'hk') {
        // 港股格式: 代码,中文名,当前价,开盘,最高,最低,昨收,涨跌,涨跌幅,...
        const hkNames = {
          '00700': '腾讯控股',
          '09988': '阿里巴巴',
          '01810': '小米集团',
          '09618': '京东集团',
          '09999': '网易-S'
        };
        name = hkNames[code.replace('hk', '')] || '港股' + code.replace('hk', '');
        price = parseFloat(parts[2]);
        change = parseFloat(parts[7]);
        pctChange = parseFloat(parts[8]);
      } else if (type === 'us') {
        // 美股格式: 名称,价格,涨跌,日期时间,...
        const usNames = {
          'gb_ixic': '纳斯达克',
          'gb_dji': '道琼斯',
          'gb_sp': '标普500'
        };
        name = usNames[code] || code;
        price = parseFloat(parts[1]);
        change = parseFloat(parts[2]);
        // 计算涨跌幅
        const prevPrice = price - change;
        pctChange = prevPrice > 0 ? parseFloat((change / prevPrice * 100).toFixed(2)) : 0;
      } else {
        // A股/指数格式: 名称,开盘,昨收,当前,最高,最低,成交量,...
        // 新浪返回的GBK编码需要转换
        let name = parts[0];
        try {
          // 将二进制字符串转换为Buffer，再正确解码
          const nameBuffer = Buffer.from(name, 'binary');
          // 尝试UTF-8解码，如果失败则使用GBK
          name = nameBuffer.toString('utf8');
          if (name.includes('�')) {
            name = nameBuffer.toString('gbk');
          }
        } catch(e) {}
        
        // 映射表确保正确显示
        const nameMap = {
          '上证指数': '上证指数',
          '深证成指': '深证成指', 
          '创业板指': '创业板指',
          '沪深300': '沪深300'
        };
        if (nameMap[name]) name = nameMap[name];
        
        const price = parseFloat(parts[3]); // 当前价
        const prevClose = parseFloat(parts[2]); // 昨收
        const change = price - prevClose; // 涨跌 = 当前 - 昨收
        const pctChange = prevClose > 0 ? parseFloat((change / prevClose * 100).toFixed(2)) : 0;
        
        return { name, price, change, pctChange };
      }
      
      resolve({ name, price, change, pctChange, raw: parts });
    } catch (e) {
      resolve(null);
    }
  });
}

// A50期货
async function getA50() {
  try {
    const { data } = await axios.get(
      'https://hq.sinajs.cn/list=nf_TS0',
      { 
        timeout: 10000,
        headers: { 'Referer': 'https://finance.sina.com.cn' }
      }
    );
    
    const match = data.match(/="([^"]*)"/);
    if (match && match[1]) {
      const parts = match[1].split(',');
      if (parts.length > 5) {
        return {
          name: '富时A50',
          price: parseFloat(parts[0]),
          prevClose: parseFloat(parts[1]),
          open: parseFloat(parts[2]),
          high: parseFloat(parts[3]),
          low: parseFloat(parts[4]),
          change: parseFloat(parts[0]) - parseFloat(parts[1]),
          pctChange: ((parseFloat(parts[0]) - parseFloat(parts[1])) / parseFloat(parts[1]) * 100).toFixed(2)
        };
      }
    }
  } catch (e) {
    console.log('⚠️ A50获取失败:', e.message);
  }
  return null;
}

// 港股 - 腾讯、阿里、小米
async function getHKStocks() {
  const stocks = [
    { code: 'hk00700', name: '腾讯控股' },
    { code: 'hk09988', name: '阿里巴巴' },
    { code: 'hk01810', name: '小米集团' }
  ];
  
  try {
    const results = await Promise.all(
      stocks.map(s => parseSinaStock(s.code, 'hk').then(data => ({ ...s, ...data })))
    );
    
    const valid = results.filter(r => r.price && !isNaN(r.price));
    if (valid.length > 0) {
      return valid.map(r => ({
        name: r.name,
        price: r.price,
        change: r.change,
        pctChange: r.pctChange
      }));
    }
  } catch (e) {
    console.log('⚠️ 港股获取失败:', e.message);
  }
  return null;
}

// 日经225
async function getNikkei() {
  // 尝试使用新浪API获取日经225
  const codes = ['index_n225', 'nk_225', 'jp_N225'];
  
  for (const code of codes) {
    try {
      const { data } = await axios.get(
        `https://hq.sinajs.cn/list=${code}`,
        { 
          timeout: 8000,
          headers: { 'Referer': 'https://finance.sina.com.cn' }
        }
      );
      
      const match = data.match(/="([^"]*)"/);
      if (match && match[1] && match[1].length > 10) {
        const parts = match[1].split(',');
        if (parts.length >= 5) {
          // 新浪格式: 名称,开盘,昨收,当前,最高,最低,...
          const name = parts[0];
          const current = parseFloat(parts[3]);
          const prevClose = parseFloat(parts[2]);
          const change = current - prevClose;
          const pctChange = prevClose > 0 ? parseFloat((change / prevClose * 100).toFixed(2)) : 0;
          
          return {
            name: '日经225',
            price: current,
            change: change,
            pctChange: pctChange
          };
        }
      }
    } catch (e) {
      continue;
    }
  }
  
  // 如果新浪不行，尝试东方财富
  try {
    const { data } = await axios.get(
      'https://push2.eastmoney.com/api/qt/ulist.np/get',
      { 
        timeout: 10000,
        params: {
          fltt: 2,
          fields: 'f2,f3,f4,f12,f14',
          secids: '100.N225'  // 日经225
        }
      }
    );
    
    if (data?.data?.diff && data.data.diff[0]) {
      const d = data.data.diff[0];
      const price = parseFloat(d.f2);
      const change = parseFloat(d.f3);
      let pct = parseFloat(d.f4);
      
      // 如果涨跌幅绝对值 > 100，说明API返回异常，需要手动计算
      if (Math.abs(pct) > 100 || isNaN(pct)) {
        const prevClose = price - change;
        pct = prevClose > 0 ? parseFloat((change / prevClose * 100).toFixed(2)) : 0;
      }
      
      return {
        name: '日经225',
        price: price,
        change: change,
        pctChange: pct
      };
    }
  } catch (e) {
    console.log('⚠️ 东方财富日经失败:', e.message);
  }
  
  return null;
}

// 美元兑人民币
async function getForex() {
  try {
    const { data } = await axios.get(
      'https://open.er-api.com/v6/latest/USD',
      { timeout: 10000 }
    );
    
    if (data?.rates?.CNY) {
      const cny = data.rates.CNY;
      return {
        USD_CNY: cny.toFixed(2),
        source: 'open.er-api.com (实时)'
      };
    }
  } catch (e) {
    console.log('⚠️ 汇率获取失败:', e.message);
  }
  return null;
}

// A股指数 - 使用新浪财经API
async function getChinaIndices() {
  const indices = [
    { code: 'sh000001', name: '上证指数' },
    { code: 'sz399001', name: '深证成指' },
    { code: 'sz399006', name: '创业板指' },
    { code: 'sz399300', name: '沪深300' }
  ];
  
  try {
    const results = [];
    
    for (const idx of indices) {
      try {
        const { data } = await axios.get(
          `https://hq.sinajs.cn/list=${idx.code}`,
          { timeout: 10000, headers: { 'Referer': 'https://finance.sina.com.cn' } }
        );
        
        const match = data.match(/="([^"]*)"/);
        if (match && match[1]) {
          const parts = match[1].split(',');
          if (parts.length >= 4) {
            const price = parseFloat(parts[3]);  // 当前价
            const prevClose = parseFloat(parts[2]); // 昨收
            const change = price - prevClose;
            const pctChange = prevClose > 0 ? parseFloat((change / prevClose * 100).toFixed(2)) : 0;
            
            results.push({
              name: idx.name,
              price: price,
              change: parseFloat(change.toFixed(2)),
              pctChange: pctChange
            });
          }
        }
      } catch (e) {
        console.log(`⚠️ ${idx.name}获取失败:`, e.message);
      }
    }
    
    return results.length > 0 ? results : null;
  } catch (e) {
    console.log('⚠️ A股获取失败:', e.message);
  }
  return null;
}

// 美股 - 使用新浪财经
async function getUSStocks() {
  const stocks = [
    { code: 'gb_ixic', name: '纳斯达克' },
    { code: 'gb_dji', name: '道琼斯' },
    { code: 'gb_sp', name: '标普500' }
  ];
  
  try {
    const results = await Promise.all(
      stocks.map(s => parseSinaStock(s.code, 'us').then(data => ({ ...s, ...data })))
    );
    
    const valid = results.filter(r => r.price && !isNaN(r.price));
    if (valid.length > 0) {
      return valid.map(r => {
        // 计算涨跌幅
        let pctChange = r.pctChange;
        if (isNaN(pctChange) || pctChange === 0) {
          const prevPrice = r.price - r.change;
          pctChange = prevPrice > 0 ? (r.change / prevPrice * 100) : 0;
        }
        return {
          name: r.name,
          price: r.price,
          change: r.change,
          pctChange: pctChange
        };
      });
    }
  } catch (e) {
    console.log('⚠️ 美股获取失败:', e.message);
  }
  return null;
}

async function getPremarketModule(config) {
  const m = config.modules.premarket;
  if (!m || !m.enabled) return null;
  
  const result = { 
    title: '📈 盘前风向标', 
    items: [], 
    fetchTime: new Date().toLocaleTimeString('zh-CN') 
  };
  
  try {
    // 1. 汇率
    if (m.items && m.items.exchange) {
      const forex = await getForex();
      if (forex) {
        const trend = parseFloat(forex['USD_CNY']) < 7.0 ? '📉 人民币升值' : '📈 人民币贬值';
        result.items.push({
          text: `💵 美元/人民币：${forex['USD_CNY']} (${trend})`,
          source: forex.source
        });
      }
    }
    
    // 2. A股
    if (m.items && m.items.china) {
      const china = await getChinaIndices();
      if (china && china.length > 0) {
        const lines = china.map(c => {
          const trend = c.change >= 0 ? '📈' : '📉';
          return `${c.name}: ${c.price} (${trend} ${c.change > 0 ? '+' : ''}${c.pctChange}%)`;
        });
        result.items.push({
          text: lines.join(' / '),
          source: '东方财富 (实时)'
        });
      }
    }
    
    // 3. A50期货
    if (m.items && m.items.a50) {
      const a50 = await getA50();
      if (a50) {
        const trend = a50.change >= 0 ? '📈' : '📉';
        result.items.push({
          text: `🇨🇳 A50期货: ${a50.price} (${trend} ${a50.change > 0 ? '+' : ''}${a50.pctChange}%)`,
          source: '新浪财经 (实时)'
        });
      }
    }
    
    // 4. 港股
    if (m.items && m.items.hk) {
      const hk = await getHKStocks();
      if (hk && hk.length > 0) {
        const lines = hk.map(s => {
          const trend = s.change >= 0 ? '📈' : '📉';
          return `${s.name}: ${s.price} (${trend} ${s.pctChange > 0 ? '+' : ''}${s.pctChange}%)`;
        });
        result.items.push({
          text: '🇭🇰 港股: ' + lines.join(' / '),
          source: '新浪财经 (实时)'
        });
      }
    }
    
    // 5. 日经
    if (m.items && m.items.japan) {
      const nikkei = await getNikkei();
      if (nikkei) {
        const trend = nikkei.change >= 0 ? '📈' : '📉';
        result.items.push({
          text: `🇯🇵 日经225: ${nikkei.price} (${trend} ${nikkei.pctChange > 0 ? '+' : ''}${nikkei.pctChange}%)`,
          source: '东方财富 (实时)'
        });
      }
    }
    
    // 6. 美股
    if (m.items && m.items.us) {
      const us = await getUSStocks();
      if (us && us.length > 0) {
        const lines = us.map(s => {
          const trend = s.change >= 0 ? '📈' : '📉';
          return `${s.name}: ${s.price} (${trend} ${s.pctChange > 0 ? '+' : ''}${s.pctChange}%)`;
        });
        result.items.push({
          text: '🇺🇸 美股: ' + lines.join(' / '),
          source: '新浪财经 (实时)'
        });
      }
    }
    
    return result;
  } catch (err) {
    console.error('❌ 盘前模块错误:', err.message);
    return { 
      title: '📈 盘前风向标', 
      items: [{ text: '数据获取失败' }], 
      fetchTime: new Date().toLocaleTimeString('zh-CN') 
    };
  }
}

module.exports = { parseSinaStock, 
  getPremarketModule, 
  getA50, 
  getHKStocks, 
  getNikkei, 
  getForex, 
  getChinaIndices, 
  getUSStocks 
};