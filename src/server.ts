import express from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { setupMailWorker } from './processor/email.processor';
import { addEmailToQueue } from './producer/email.producer';

const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); 


/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, async () => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);
    setupMailWorker();
    logger.info(`Mailer worker setup completed`);
    
  addEmailToQueue({
    to: 'kashyapkrityan@gmail.com',
    subject: "you have booked a room",
    templateId: "welcome",
    params: {
      name: "Patna New Hotel",
      appName: "Make my trip"
    }
  })
    
});
