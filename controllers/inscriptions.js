const { Inscription } = require("../models");

const getInscriptions = async (root, args, req) => {
  try {
    const role = req.user.role;
    if(!["ADMIN", "LEADER"].includes(role)) throw new Error("El rol no puede ver las inscripciones");

    const inscription = await Inscription.find()
      .populate("projectId")
      .populate("studentId")
      .populate("leader");
    return inscription;
  } catch (error) {
    throw new Error(`Error al traer las inscripciones: ${error}`);
  }
};

const createInscription = async (root, args, req) => {
  try {
    const role = req.user.role;
    if(role !== "STUDENT") throw new Error("El rol no puede crear una inscripción");

    const { projectId } = args;
    await Inscription.create({
      projectId,
      studentId: req.user._id,
    });
    return "La inscripción se creo correctamente";
  } catch (error) {
    throw new Error(`Error al crear la inscripción: ${error}`);
  }
};

const approveInscription = async (root, args, req) => {
  try {
    const { _id } = args;
    await Inscription.findOneAndUpdate({ _id }, {
      status: "ACCEPTED",
      admissionDate: Date.now()
    }, { new: true });
    return "La inscripción se actualizó correctamente";
  } catch (error) {
    throw new Error(`Error al actualizar la inscripción: ${error}`);
  }
};

module.exports = {
  getInscriptions,
  createInscription,
  approveInscription,
};
