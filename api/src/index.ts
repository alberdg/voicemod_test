import mongoose from 'mongoose';
import { app } from './app';
const HTTP_PORT = 3001;

/**
 * Starts the API server
 * @function
 */
const start = async () => {
  // Throw an error if mongo uri env variable does not exist
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.error(err);
  }

  app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
  });
};

start();

// Process terminated time to clean up
process.on('SIGTERM', () => mongoose.connection.close());

// Process terminated time to clean up
process.on('SIGINT', () => mongoose.connection.close());
