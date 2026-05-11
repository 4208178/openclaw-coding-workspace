/**
 * 数据库模块 - SQLite
 * 无需外部数据库服务，轻量嵌入式
 */

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'morning-news.db');
const db = new Database(DB_PATH);

// 初始化表结构
function initDatabase() {
  db.exec(`
    -- 晨报主表
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      data TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    
    -- 执行日志表
    CREATE TABLE IF NOT EXISTS job_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      report_date TEXT,
      status TEXT DEFAULT 'running' CHECK(status IN ('running', 'success', 'failed')),
      message TEXT,
      duration_ms INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    
    -- 索引
    CREATE INDEX IF NOT EXISTS idx_reports_date ON reports(date);
    CREATE INDEX IF NOT EXISTS idx_logs_date ON job_logs(report_date);
    CREATE INDEX IF NOT EXISTS idx_logs_status ON job_logs(status);
  `);
  
  console.log('✅ 数据库初始化完成:', DB_PATH);
}

// 初始化
initDatabase();

// ============ 晨报操作 ============

// 保存或更新晨报
function saveReport(date, data) {
  const stmt = db.prepare(`
    INSERT INTO reports (date, data, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(date) DO UPDATE SET
      data = excluded.data,
      updated_at = datetime('now')
  `);
  return stmt.run(date, JSON.stringify(data));
}

// 获取最新晨报
function getLatestReport() {
  const stmt = db.prepare('SELECT * FROM reports ORDER BY date DESC LIMIT 1');
  const row = stmt.get();
  if (row) {
    row.data = JSON.parse(row.data);
  }
  return row;
}

// 获取指定日期晨报
function getReportByDate(date) {
  const stmt = db.prepare('SELECT * FROM reports WHERE date = ?');
  const row = stmt.get(date);
  if (row) {
    row.data = JSON.parse(row.data);
  }
  return row;
}

// 获取历史晨报列表
function getReportList(limit = 30) {
  const stmt = db.prepare('SELECT date, version, created_at FROM reports ORDER BY date DESC LIMIT ?');
  return stmt.all(limit);
}

// ============ 日志操作 ============

// 开始任务记录
function startJob(reportDate) {
  const stmt = db.prepare(`
    INSERT INTO job_logs (report_date, status, created_at)
    VALUES (?, 'running', datetime('now'))
  `);
  const result = stmt.run(reportDate);
  return result.lastInsertRowid;
}

// 更新任务状态
function updateJob(jobId, status, message, durationMs) {
  const stmt = db.prepare(`
    UPDATE job_logs 
    SET status = ?, message = ?, duration_ms = ?
    WHERE id = ?
  `);
  return stmt.run(status, message, durationMs, jobId);
}

// 获取任务日志
function getJobLogs(reportDate, limit = 100) {
  let stmt;
  if (reportDate) {
    stmt = db.prepare(`
      SELECT * FROM job_logs 
      WHERE report_date = ? 
      ORDER BY created_at DESC 
      LIMIT ?
    `);
    return stmt.all(reportDate, limit);
  } else {
    stmt = db.prepare(`
      SELECT * FROM job_logs 
      ORDER BY created_at DESC 
      LIMIT ?
    `);
    return stmt.all(limit);
  }
}

module.exports = {
  db,
  saveReport,
  getLatestReport,
  getReportByDate,
  getReportList,
  startJob,
  updateJob,
  getJobLogs
};
