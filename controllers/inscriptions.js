const { Inscription, User, Project } = require("../models");

const getInscriptions = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "LEADER") throw new Error("El rol no puede ver las inscripciones");

    const inscription = await Inscription.find({ leaderId: req.user._id })
      .populate("projectId")
      .populate("studentId")
      .populate("leaderId");
    return inscription;
  } catch (error) {
    throw new Error(error);
  }
};

const getInscriptionsByStudentId = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "STUDENT") throw new Error("El rol no puede ver las inscripciones");

    const inscriptions = await Inscription.find({ studentId: req.user._id });
    return inscriptions.map(inscription => inscription.projectId);
  } catch (error) {
    throw new Error(error);
  }
};

const createInscription = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "STUDENT") throw new Error("El rol no puede crear una inscripción");

    const { projectId } = args;
    const project = await Project.findById(projectId);

    await Inscription.create({
      projectId,
      leaderId: project.leader,
      studentId: req.user._id,
    });
    return "La inscripción se creo correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

const approveInscription = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "LEADER") throw new Error("El rol no puede crear aprobar la inscripción");

    const { _id, status } = args;

    const objectUpdate = {};
    if (status === "ACCEPTED") {
      objectUpdate["status"] = "ACCEPTED";
      objectUpdate["admissionDate"] = Date.now();
    } else if (status === "REJECTED") {
      objectUpdate["status"] = "REJECTED";
    }
    await Inscription.findOneAndUpdate({ _id }, objectUpdate, { new: true });
    return "La inscripción se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getInscriptions,
  createInscription,
  getInscriptionsByStudentId,
  approveInscription,
};
