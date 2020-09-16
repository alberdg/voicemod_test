import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';



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
  res.status(404).send(new NotFoundError(req.url).serializeErrors());
});

app.use(errorHandler);

export { app };
