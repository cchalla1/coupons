import createServer from './src';
import express from 'express';
const app = express();

createServer(app).then(() => {
  const orderPort = process.env.ORDER_PORT || 5000;
  app.listen(orderPort, () => {
    console.log('running at localhost: ' + orderPort);
  });
});
