import express, { Express, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { countryRouter } from './routes/country';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { updateRouter } from './routes/update';
import { deleteRouter } from './routes/delete';
import { usersRouter } from './routes/users';
import { showRouter } from './routes/show';
import { updatePasswordRouter } from './routes/update-password';
import { NotFoundError } from './errors/not-found-error';

const allowedOrigins = [ 'http://localhost:3000', 'http://localhost' ];

/**
 * Sets security headers for given response
 * @function
 * @param <Object> req - Http request
 * @param <Object> res - Http response
 * @param <Object> next - Callback
 * @returns <void>
 */
const setCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Powered-By', 'VOICEMOD API');
  const origin: string = req.headers.origin!;
  if(allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  }
  next();
}


const app: Express = express();
app.use(json());
app.use(helmet());
app.use(setCorsHeaders);
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
app.use(usersRouter);
app.use(showRouter);
app.use(updatePasswordRouter);

/**
 * Catches all non registered routes and throws an error
 */
app.all('*', (req: Request, res: Response) => {
  res.status(404).send(new NotFoundError(req.url).serializeErrors());
});

app.use(errorHandler);

export { app };
