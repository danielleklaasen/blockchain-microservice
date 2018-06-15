import { Handler } from 'aws-lambda';
import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet  from 'helmet';
import * as mongoose from 'mongoose';
import * as serverless from 'serverless-http';
import logger from './util/logger';
import { MONGODB_URI } from './util/secrets';

/*
- [ ] blockchain core engine
- [ ] blockchain fitting
- [ ] blockchain connect to mongo
 */

// Express
export const app = express(); // Create Express server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// MongoDB connection
bluebird.promisifyAll(mongoose as any); // use bluebird for promises
mongoose.connect(MONGODB_URI).then(() => {
  // Ready to use. The `mongoose.connect()` promise resolves to undefined.
})
.catch((error) => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running. ' + error);
  process.exit();
});

// Controllers (route handlers)
import * as blockchainController from './controllers/blockchain';
import * as homeController from './controllers/home';

// Primary app routes
app.get('/', homeController.index);
app.get('/health-check', homeController.healthCheck);
app.post('/transaction', blockchainController.addTransaction);
app.get('/blockchain', blockchainController.getBlockchain);

export const init: Handler = serverless(app);
