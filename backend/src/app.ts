import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from 'dotenv';
import tripRoutes from './routes/TripRoute';

config();

const buildServer = () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(cors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  });
    
  fastify.register(tripRoutes, { prefix: '/api/trips' });

  return fastify;
};

export default buildServer;