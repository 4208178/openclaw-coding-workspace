import request from 'supertest';
import Fastify from 'fastify';
import app from '../src/index';

describe('Health Check API', () => {
  let server: Fastify.FastifyInstance;

  beforeAll(async () => {
    server = await Fastify().register(require('../src/index'));
    await server.listen({ port: 0 });
  });

  afterAll(async () => {
    await server.close();
  });

  it('GET /health should return status ok', async () => {
    const response = await request(server.server as any).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version', '1.0.0');
    expect(response.body).toHaveProperty('service', 'openclaw-cto-workspace');
  });

  it('GET / should return welcome message', async () => {
    const response = await request(server.server as any).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('docs');
    expect(response.body).toHaveProperty('health');
  });
});
