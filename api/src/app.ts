import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

const app: Express = express();
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

/**
 * Catches all non registered routes and throws an error
 */
app.all('*', async (req: Request, res: Response) => {
  // Temporal, Implement a not found error to return a 404
  res.status(404).send('This route does not exist');
});

export { app };
