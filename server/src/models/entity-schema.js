import autoId from 'mongoose-better-id';
import mongoose from 'mongoose';

export default () => {
  const Category = mongoose.model('Category');
  const Schema = mongoose.Schema;

  const entitySchema = new Schema({
    _id: String,
    type: {type: String, ref: Category},
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: String,
    name: String,
    registeredOn: {type: Date, default: Date.now},
  });

  entitySchema.plugin(autoId, {
    connection: mongoose.connection,
    field: '_id',
    prefix: 'en',
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

  mongoose.model('Entity', entitySchema);
};
