import express, { Express, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { countryRouter } from './routes/country';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
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
    res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    secure: false,
    path: '/'
  })
);

app.use(currentUser);
app.use(countryRouter);
app.use(updateRouter);
app.use(deleteRouter);
app.use(usersRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
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
