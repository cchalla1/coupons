import autoId from 'mongoose-better-id';
import mongoose from 'mongoose';

export default () => {
  const Schema = mongoose.Schema;

  const categorySchema = new Schema({
    _id: String,
    type: String,
  });

  categorySchema.plugin(autoId, {
    connection: mongoose.connection,
    field: '_id',
    prefix: 'ct',
    suffix: {
      start: 0,
      step: 1,
      max: 99,
    },
    timestamp: {
      enable: true,
      format: '100',
    },
  });

  mongoose.model('Category', categorySchema);
};
