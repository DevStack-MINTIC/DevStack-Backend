const { Progress, Project, Inscription } = require("../models");

const getProgressByProjectId = async (root, args, req) => {
  try {
    // const { _id, role } = req.user;
    // if(role !== "STUDENT") throw new Error("El rol no puede ver avances");
    // const inscription = await Inscription.findOne({ studentId: _id });
    // if(inscription?.status !== "ACCEPTED") throw new Error("El estudiante no se encuentra inscrito al proyecto");
    
    const { projectId } = args;
    const progress = await Progress.find({ projectId }).populate("projectId");
    return progress;
  } catch (error) {
    throw new Error(error);
  }
};

const createProgress = async (root, args, req) => {
  try {
    const { _id, role } = req.user;
    if(role !== "STUDENT") throw new Error("El rol no puede crear avances");
    const inscription = await Inscription.findOne({ studentId: _id });
    if(inscription?.status !== "ACCEPTED") throw new Error("El estudiante no se encuentra inscrito al proyecto");

    const { projectId, description } = args;
    const progress = Progress.find({ projectId });
    if (progress.lenth === 0) {
      await Project.findOneAndUpdate({ _id: projectId }, {
        phase: "STARTED"
      });
    }
    
    await Progress.create({
      projectId,
      description,
    });
    return "El progreso se creo correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

const updateProgress = async (root, args, req) => {
  try {
    const { _id: studentId, role } = req.user;
    if(role !== "STUDENT") throw new Error("El rol no puede actualizar avances");
    const inscription = await Inscription.findOne({ studentId });
    if(inscription?.status !== "ACCEPTED") throw new Error("El estudiante no se encuentra inscrito al proyecto");

    const { _id, description } = args;
    await Progress.findOneAndUpdate({ _id }, {
      description
    }, { new: true });
    return "El avance se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};


const updateObsevation = async (root, args, req) => {
  try {
    const role = req.user.role;
    if(role !== "LEADER") throw new Error("El rol no puede crear observaciones para avances");

    const { _id, observation } = args;
    await Progress.findOneAndUpdate({ _id }, {
      observation
    }, { new: true });
    return "La observación se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getProgressByProjectId,
  createProgress,
  updateProgress,
  updateObsevation,
};
