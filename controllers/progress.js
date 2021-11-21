const { Progress } = require("../models");

const getProgressByProjectId = async (root, args) => {
  try {
    const { projectId } = args;
    const progress = await Progress.findById(projectId);
    return progress;
  } catch (error) {
    throw new Error(`Error al traer los usuarios: ${error}`);
  }
};

const createProgress = async (root, args, req) => {
  try {
    const { projectId, description } = args;
    const progress = await Project.create({
      projectId,
      description,
    });
    return progress;
  } catch (error) {
    throw new Error(`Error al traer usuario: ${error}`);
  }
};

const updateObsevation = async (root, args, req) => {
  try {
    const { _id, observation } = args;
    const progress = await Project.findOneAndUpdate({ _id }, {
      observation
    }, { new: true });
    return progress;
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error}`);
  }
};

module.exports = {
  getProgressByProjectId,
  createProgress,
  updateObsevation,
};
