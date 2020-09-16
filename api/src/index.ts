import { app } from './app';
const HTTP_PORT = 3001;

/**
 * Starts the API server
 * @function
 */
const start = async () => {
  app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
  });
};

start();
