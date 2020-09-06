import bodyParser from 'body-parser';
import createAuth from './auth';
import initializeDB from './data';
import router from './routes/app-router';

const createServer = async app => {
  app.use(bodyParser.json());

  app.get('/*', function (req, res, next) {
    if (req.url.indexOf('api') === -1) {
      res.send('index');
    } else {
      next();
    }
  });
  app.use('/api', router);

  await initializeDB();
  createAuth(app);
};

export default createServer;
