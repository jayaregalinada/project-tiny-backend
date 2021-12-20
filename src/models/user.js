const { Schema, model } = require('mongoose');
const random = require('mongoose-random');

const schema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
  },
};

const userSchema = Schema(schema, {
  timestamps: true,
});

userSchema.statics.random = function (callback) {
  this.estimatedDocumentCount(
    function (error, count) {
      if (error) {
        return callback(error);
      }

      const random = Math.floor(Math.random() * count);

      this.findOne().skip(random).exec(callback);
    }.bind(this),
  );
};

module.exports = model('User', userSchema);
