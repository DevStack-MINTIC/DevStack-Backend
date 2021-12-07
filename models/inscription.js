const { Schema, model } = require("mongoose");

const inscriptionSchema = Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  leaderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["ACCEPTED", "REJECTED", null],
    default: null,
  },
  addmissionDate: {
    type: Date,
    default: null,
  },
  departureDate: {
    type: Date,
    default: null,
  },
});

inscriptionSchema.methods.toJSON = function () {
  const { __v, ...inscription } = this.toObject();
  return inscription;
};

module.exports = model("Inscription", inscriptionSchema);
