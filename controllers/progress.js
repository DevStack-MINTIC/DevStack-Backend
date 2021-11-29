const { Progress } = require("../models");

const getProgressByProjectId = async (root, args) => {
  try {
    const { projectId } = args;
    const progress = await Progress.find({ projectId }).populate("projectId");
    return progress;
  } catch (error) {
    throw new Error(`Error al traer los progresos del proyecto: ${error}`);
  }
};

const createProgress = async (root, args, req) => {
  try {
    const { projectId, description } = args;
    await Progress.create({
      projectId,
      description,
    });
    return "El progreso se creo correctamente";
  } catch (error) {
    throw new Error(`Error al crear el progreso del proyecto: ${error}`);
  }
};

const updateProgress = async (root, args, req) => {
  try {
    const { _id, description } = args;
    await Progress.findOneAndUpdate({ _id }, {
      description
    }, { new: true });
    return "El avance se actualizó correctamente";
  } catch (error) {
    throw new Error(`Error al actualizar el avance del proyecto: ${error}`);
  }
};


const updateObsevation = async (root, args, req) => {
  try {
    const { _id, observation } = args;
    await Progress.findOneAndUpdate({ _id }, {
      observation
    }, { new: true });
    return "La observación se actualizó correctamente";
  } catch (error) {
    throw new Error(`Error al actualizar la observación del proyecto: ${error}`);
  }
};

module.exports = {
  getProgressByProjectId,
  createProgress,
  updateProgress,
  updateObsevation,
};
