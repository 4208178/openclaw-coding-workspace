/**
 * 历史事件维护脚本
 * 用途：更新/补充历史事件数据库
 * 使用方法：node scripts/update-history.js [--add "5-11|2024|事件|描述"]
 */

const fs = require('fs');
const path = require('path');

// 数据文件路径
const DATA_FILE = path.join(__dirname, '..', 'data', 'historical-events.js');

// 读取现有数据
function loadData() {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  const match = content.match(/const historicalEvents = ({[\s\S]*?});/);
  if (match) {
    return eval('(' + match[1] + ')');
  }
  return {};
}

// 保存数据
function saveData(data) {
  const content = `/**
 * 历史事件数据库
 * 数据来源：维基百科、历史资料
 * 维护方式：每月更新/年度补充
 * 最后更新：${new Date().toLocaleDateString('zh-CN')}
 */

const historicalEvents = ${JSON.stringify(data, null, 2)};

// 导出
module.exports = { historicalEvents };`;

  fs.writeFileSync(DATA_FILE, content, 'utf-8');
  console.log('✅ 数据已保存');
}

// 添加新事件
function addEvent(dateKey, year, event, desc) {
  const data = loadData();
  
  if (!data[dateKey]) {
    data[dateKey] = [];
  }
  
  // 检查是否已存在
  const exists = data[dateKey].some(e => e.year === year && e.event === event);
  if (exists) {
    console.log('⚠️ 事件已存在');
    return;
  }
  
  data[dateKey].push({ year, event, desc });
  
  // 按年份排序
  data[dateKey].sort((a, b) => b.year - a.year);
  
  saveData(data);
  console.log(`✅ 已添加: ${dateKey} - ${year} ${event}`);
}

// 列出所有日期
function listDates() {
  const data = loadData();
  console.log('📅 已记录的日期:');
  Object.keys(data).sort((a, b) => {
    const [ma, da] = a.split('-').map(Number);
    const [mb, db] = b.split('-').map(Number);
    return ma - mb || da - db;
  }).forEach(key => {
    console.log(`  ${key}: ${data[key].length}条事件`);
  });
}

// 查看指定日期
function showDate(dateKey) {
  const data = loadData();
  const events = data[dateKey];
  if (!events) {
    console.log(`⚠️ ${dateKey} 无数据`);
    return;
  }
  console.log(`📜 ${dateKey} 历史事件 (${events.length}条):`);
  events.forEach(e => {
    console.log(`  ${e.year}年: ${e.event}`);
    console.log(`    → ${e.desc}`);
  });
}

// 验证数据完整性
function validate() {
  const data = loadData();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const days = Array.from({length: 31}, (_, i) => i + 1);
  
  console.log('🔍 数据完整性检查:');
  
  let totalEvents = 0;
  let emptyDates = [];
  
  for (let m of months) {
    for (let d of days) {
      const key = `${m}-${d}`;
      if (data[key] && data[key].length > 0) {
        totalEvents += data[key].length;
      } else {
        emptyDates.push(key);
      }
    }
  }
  
  console.log(`  总事件数: ${totalEvents}`);
  console.log(`  有数据日期: ${365 - emptyDates.length}`);
  console.log(`  空日期: ${emptyDates.length}`);
  
  if (emptyDates.length > 0) {
    console.log('  缺失日期示例:', emptyDates.slice(0, 10).join(', '));
  }
}

// 命令行入口
const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === '--add' && args[1]) {
  const parts = args[1].split('|');
  if (parts.length === 4) {
    addEvent(parts[0], parseInt(parts[1]), parts[2], parts[3]);
  } else {
    console.log('用法: --add "月-日|年份|事件|描述"');
  }
} else if (cmd === '--list') {
  listDates();
} else if (cmd === '--show' && args[1]) {
  showDate(args[1]);
} else if (cmd === '--validate') {
  validate();
} else {
  console.log(`
📝 历史事件维护工具

用法:
  node update-history.js --add "5-11|2024|事件|描述"  添加事件
  node update-history.js --list                        列出所有日期
  node update-history.js --show 5-11                  查看指定日期
  node update-history.js --validate                   验证数据完整性

示例:
  node update-history.js --add "5-11|2024|神舟发射|成功发射新一代飞船"
  node update-history.js --show 5-11
  `);
}