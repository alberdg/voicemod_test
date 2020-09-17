import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { countryRouter } from './routes/country';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { updateRouter } from './routes/update';
import { deleteRouter } from './routes/delete';
import { NotFoundError } from './errors/not-found-error';

const app: Express = express();
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(countryRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(updateRouter);
app.use(deleteRouter);

/**
 * Catches all non registered routes and throws an error
 */
app.all('*', (req: Request, res: Response) => {
  res.status(404).send(new NotFoundError(req.url).serializeErrors());
});

app.use(errorHandler);

export { app };
