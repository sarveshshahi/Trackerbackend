// filepath: /e:/Tracker/Trackerbackend/src/utils/redisClient.js
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();

export default redisClient;