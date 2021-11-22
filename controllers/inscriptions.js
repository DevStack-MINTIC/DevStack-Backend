const { Inscription } = require("../models");

const getInscriptions = async (root, args) => {
  try {
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

const updateInscription = async (root, args, req) => {
  try {
    const { _id, status } = args;
    await Inscription.findOneAndUpdate({ _id }, {
      status,
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
  updateInscription,
};
