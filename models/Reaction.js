const { Schema, model, Types } = require('mongoose');

// Schema to create a reaction model

const ReactionSchema = new Schema(
  {
    reactionsId: {
      type: Schema.Types.Objectid,
      default: () => new Types.ObjectId()
    },
    reactionsBody: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Reaction = model('Reaction', ReactionSchema)

module.exports = Reaction;