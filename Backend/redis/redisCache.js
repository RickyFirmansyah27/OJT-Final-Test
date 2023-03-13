import redis from 'redis';

const client = redis.createClient(6379, 'localhost');
export default client;
