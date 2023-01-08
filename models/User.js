const { Schema, model } = require('mongoose');
const ThoughtsSchema = require('./Thoughts');

// Schema to create Student model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, 
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v)
        }
      },
      message: props => `${props.value} is not a valid email!` 
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thoughts'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

UserSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
});

const User = model('user', UserSchema);

module.exports = User;
