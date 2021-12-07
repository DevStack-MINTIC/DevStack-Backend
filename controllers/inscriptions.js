const { Inscription, User } = require("../models");

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

const createInscription = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "STUDENT") throw new Error("El rol no puede crear una inscripción");

    const { projectId } = args;
    await Inscription.create({
      projectId,
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

    const { _id } = args;
    await Inscription.findOneAndUpdate({ _id }, {
      status: "ACCEPTED",
      admissionDate: Date.now()
    }, { new: true });
    return "La inscripción se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getInscriptions,
  createInscription,
  approveInscription,
};
