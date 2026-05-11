-- 晨间速递数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS morning_news CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE morning_news;

-- 晨报主表
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL UNIQUE COMMENT '日期',
  data JSON NOT NULL COMMENT '晨报完整数据',
  version VARCHAR(20) DEFAULT '1.0.0' COMMENT '数据版本',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='晨报数据表';

-- 执行日志表
CREATE TABLE IF NOT EXISTS job_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  report_date DATE COMMENT '关联的晨报日期',
  status ENUM('running', 'success', 'failed') DEFAULT 'running' COMMENT '执行状态',
  message TEXT COMMENT '日志消息',
  duration_ms INT COMMENT '执行耗时(毫秒)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_report_date (report_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='任务执行日志表';

-- 插入测试数据（可选）
-- INSERT INTO reports (date, data) VALUES ('2026-05-11', '{"test": true}');
