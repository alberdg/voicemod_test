import Redis from 'ioredis';
import { promisify } from 'util';
const REDIS_CONNECT_INFO = { port: 6379, host: 'redis' };
const redisClient = new Redis(REDIS_CONNECT_INFO);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

/**
 * Gets the given key from redis
 * @function
 * @param Key to get
 * @returns value Value retrieved
 */
export const redisGet = async (key: string): Promise<any> => {
  const elements: any = await getAsync(key);
  return (elements) ? JSON.parse(elements) : null;
}

/**
 * Sets the given value for the given key in redis
 * @function
 * @param key Key to set
 * @param value Value to set
 */
export const redisSet = async (key: string, value: any): Promise<any> => {
  await setAsync(key, JSON.stringify(value));
}
