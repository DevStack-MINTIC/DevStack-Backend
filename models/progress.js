const { Schema, model } = require("mongoose");

const progressSchema = Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  progressDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  observation: {
    type: String,
  },
});

progressSchema.methods.toJSON = function () {
  const { __v, ...progress } = this.toObject();
  return progress;
};

module.exports = model("Progress", progressSchema);
