const { Schema, model, Types } = require("mongoose");
const ReactionSchema = require("./Reaction");
const ThoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 250,
  },
  userName: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema]
},
  {
    toJSON: {
    getters: true
    },
    id: false
  },
);

ThoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts;
