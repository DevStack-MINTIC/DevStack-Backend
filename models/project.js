const { Schema, model } = require("mongoose");

const ProjectSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  generalObjective: {
    type: String,
    required: [true, "El objetivo general es obligatorio"],
  },
  specificObjectives: {
    type: [String],
    required: [true, "Los objetivos específicos son obligatorios"],
  },
  budget: {
    type: String,
    required: [true, "El presupuesto es obligatorio"],
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El lider es obligatorio"],
  },
  status: {
    type: String,
    required: [true, "El estado es obligatorio"],
    enum: ["ACTIVE", "INACTIVE"],
    default: "INACTIVE",
  },
  phase: {
    type: String,
    enum: ["STARTED", "IN_PROGRESS", "FINISHED", null],
    default: null,
  }
});

ProjectSchema.methods.toJSON = function () {
  const { __v, ...project } = this.toObject();
  return project;
};

module.exports = model("Project", ProjectSchema);
