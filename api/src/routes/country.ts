import { Router, Request, Response } from 'express';
import { Country } from '../models/country';
const countryRouter = Router();

/**
 * Fetches all countries
 * @function
 * @param path Route path
 * @param callback Express middleware callback
 */
countryRouter.get('/api/countries', async (req: Request, res: Response) => {
const countries = await Country.find({});
res.send(countries);

});

export { countryRouter };
