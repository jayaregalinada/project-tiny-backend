const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const userModel = require('./user');

const schema = {
  title: {
    type: String,
  },
  body: {
    type: String,
    text: true,
  },
  heroImage: {
    type: String,
    default: null,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: userModel,
  },
};

const storySchema = Schema(schema, {
  timestamps: true,
});
storySchema.plugin(mongoosePaginate);

module.exports = model('Story', storySchema);
