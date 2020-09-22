import Redis from 'ioredis';
import { promisify } from 'util';
const REDIS_CONNECT_INFO = { port: 6379, host: 'redis' };


class RedisWrapper {
  private _redisClient?: Redis.Redis;
  private getAsync: Function;
  private setAsync: Function;

  constructor () {
    this.connect();
    this.getAsync = promisify(this._redisClient!.get).bind(this._redisClient);
    this.setAsync = promisify(this._redisClient!.set).bind(this._redisClient);
  }

  get client() {
    if (!this._redisClient) {
      throw new Error('Cannot access Redis client before connecting');
    }
    return this._redisClient;
  }

  connect () {
    this._redisClient =  new Redis(REDIS_CONNECT_INFO);
  }

  /**
   * Gets the given key from redis
   * @function
   * @param Key to get
   * @returns value Value retrieved
   */
  async redisGet (key: string): Promise<any> {
    const elements: any = await this.getAsync(key);
    return (elements) ? JSON.parse(elements) : null;
  }

  /**
   * Sets the given value for the given key in redis
   * @function
   * @param key Key to set
   * @param value Value to set
   */
  async redisSet (key: string, value: any): Promise<void> {
    await this.setAsync(key, JSON.stringify(value));
  }
}

export const redisWrapper = new RedisWrapper();
