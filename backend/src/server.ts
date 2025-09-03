import { config } from 'dotenv';
import { dbConnect } from './config/db';
import buildServer from './app';

config();

const startServer = async () => {
  try {
    await dbConnect();
    
    const fastify = buildServer();
    
    const port = parseInt(process.env.PORT || '5000');
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();