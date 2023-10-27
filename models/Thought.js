const dayjs = require('dayjs');
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: function (date) {
        return dayjs(date).format('MM/DD/YYYY');
      },
    },
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports=reactionSchema;