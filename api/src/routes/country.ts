import { Router, Request, Response } from 'express';
import { Country } from '../models/country';
import { redisGet, redisSet } from '../config';
const COUNTRIES = 'countries';
const countryRouter = Router();

/**
 * Caches countries in memory
 * @function
 */
const cacheCountries = async (): Promise<void> => {
  const countries = await Country.find({});
  redisSet(COUNTRIES, countries);
}


/**
 * Fetches all countries
 * @function
 * @param path Route path
 * @param callback Express middleware callback
 */
countryRouter.get('/api/countries', async (req: Request, res: Response) => {
  const cached: any[] = await redisGet(COUNTRIES);
  if (Array.isArray(cached) && cached.length > 0) {
    return res.send(cached);
  }
  const countries = await Country.find({});
  redisSet(COUNTRIES, countries);
  res.send(countries);
});

export { countryRouter, cacheCountries };
