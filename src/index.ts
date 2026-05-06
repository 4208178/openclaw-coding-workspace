import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoload from '@fastify/autoload';
import { join } from 'path';

const fastify = Fastify({
  logger: {
    level: 'info'
  }
});

// 注册 CORS
fastify.register(cors, {
  origin: true,
  credentials: true
});

// 注册自动加载插件（用于模块化路由）
fastify.register(autoload, {
  dir: join(__dirname, 'plugins'),
  options: {
    prefix: '/api'
  }
});

// 健康检查接口
fastify.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'openclaw-cto-workspace'
  };
});

// 根路径
fastify.get('/', async (request, reply) => {
  return {
    message: 'Welcome to OpenClaw CTO Workspace',
    docs: '/docs',
    health: '/health'
  };
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`🚀 Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
