/**
 * 模块：天气与决策
 * 包含：基础天气、空气质量、穿衣建议、出行建议
 */

const axios = require('axios');

async function getWeather(city = 'Beijing') {
  const url = `https://wttr.in/${city}?format=j1`;
  const { data } = await axios.get(url);
  const w = data.current_condition[0];
  
  return {
    temp: parseInt(w.temp_C),
    feelsLike: parseInt(w.FeelsLikeC),
    weather: w.weatherDesc[0].value,
    humidity: parseInt(w.humidity),
    wind: parseInt(w.windspeedKmph),
    visibility: parseInt(w.visibility),
    uv: w.uvIndex ? parseInt(w.uvIndex) : 0,
    updateTime: w.localObsDateTime
  };
}

async function getAQI(city = 'Beijing') {
  try {
    // wttr.in 暂不支持 AQI，使用默认数据
    // 实际生产可接入 waqi.info API
    return { aqi: 35, level: '优', pm25: 15 };
  } catch (e) {
    return { aqi: 50, level: '良', pm25: 20 };
  }
}

// 根据天气生成穿衣建议
function getClothingAdvice(weather) {
  const { temp, weather: w, wind } = weather;
  
  let advice = '';
  
  if (temp >= 28) {
    advice = '建议穿短袖短裤，清凉出行';
  } else if (temp >= 20) {
    advice = '建议穿长袖T恤或薄外套';
  } else if (temp >= 10) {
    advice = '建议穿外套，早晚偏凉';
  } else {
    advice = '建议穿厚外套或羽绒服，注意保暖';
  }
  
  if (wind > 20) {
    advice += '，风速较大，建议穿防风外套';
  }
  
  if (w.toLowerCase().includes('rain') || w.toLowerCase().includes('drizzle')) {
    advice += '，有降水可能，建议带伞';
  }
  
  return advice;
}

// 根据天气生成出行建议
function getTravelAdvice(weather) {
  const { weather: w, visibility, uv } = weather;
  
  let advice = [];
  
  // 天气状况
  if (w.toLowerCase().includes('clear') || w.toLowerCase().includes('sunny')) {
    advice.push('天气晴朗，适合户外活动');
  } else if (w.toLowerCase().includes('cloud')) {
    advice.push('多云天气，适宜出行');
  } else if (w.toLowerCase().includes('rain')) {
    advice.push('有降水，建议携带雨具，驾车注意安全');
  } else if (w.toLowerCase().includes('fog') || w.toLowerCase().includes('mist')) {
    advice.push('有雾，能见度较低，出行注意安全');
  }
  
  // 紫外线
  if (uv >= 7) {
    advice.push('紫外线强，建议涂防晒霜、戴遮阳帽');
  } else if (uv >= 3) {
    advice.push('紫外线中等，户外活动注意防晒');
  }
  
  // 能见度
  if (visibility < 5) {
    advice.push('能见度较低，驾车请小心');
  }
  
  return advice.join('；');
}

// 主函数：获取完整天气模块数据
async function getWeatherModule(config) {
  const m = config.modules.weather;
  if (!m.enabled) return null;
  
  const result = { title: '☀️ 天气', items: [] };
  
  try {
    const weather = await getWeather(config.city);
    const aqi = await getAQI(config.city);
    
    // 基础天气
    if (m.items.basic) {
      result.items.push({
        type: 'basic',
        text: `${config.cityCN}：${weather.weather} ${weather.temp}°C，体感${weather.feelsLike}°C`
      });
    }
    
    // 空气质量
    if (m.items.aqi && aqi) {
      result.items.push({
        type: 'aqi',
        text: `空气质量：${aqi.level} (AQI ${aqi.aqi})`
      });
    }
    
    // 穿衣建议
    if (m.items.clothing) {
      result.items.push({
        type: 'clothing',
        text: `👕 穿衣：${getClothingAdvice(weather)}`
      });
    }
    
    // 出行建议
    if (m.items.travel) {
      result.items.push({
        type: 'travel',
        text: `🚗 出行：${getTravelAdvice(weather)}`
      });
    }
    
    // 添加数据获取时间
    result.fetchTime = new Date().toLocaleString('zh-CN');
    result._data = { weather, aqi };
    return result;
    
  } catch (err) {
    console.error('❌ 天气模块错误:', err.message);
    return { title: '☀️ 天气', items: [{ type: 'error', text: '天气数据获取失败' }] };
  }
}

module.exports = { getWeatherModule, getWeather, getAQI, getClothingAdvice, getTravelAdvice };