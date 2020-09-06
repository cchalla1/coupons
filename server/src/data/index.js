import createSchemas from '../models';
import mongoose from 'mongoose';

const initializeDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/caon');
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection is open');
  });
  createSchemas(mongoose);
};

export default initializeDB;
