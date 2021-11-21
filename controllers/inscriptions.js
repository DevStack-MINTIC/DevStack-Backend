const { Inscription } = require("../models");

const getInscriptions = async (root, args) => {
  try {
    const inscription = await Inscription.find();
    return inscription;
  } catch (error) {
    throw new Error(`Error al traer los usuarios: ${error}`);
  }
};

const createInscription = async (root, args, req) => {
  try {
    const { projectId, studentId } = args;
    const inscription = await Inscription.create({
      projectId,
      studentId,
    });
    return inscription;
  } catch (error) {
    throw new Error(`Error al traer usuario: ${error}`);
  }
};

const updateInscription = async (root, args, req) => {
  try {
    const { _id, status } = args;
    const inscription = await Inscription.findOneAndUpdate({ _id }, {
      status,
      admissionDate: Date.now()
    }, { new: true });
    return inscription;
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error}`);
  }
};

module.exports = {
  getInscriptions,
  createInscription,
  updateInscription,
};
