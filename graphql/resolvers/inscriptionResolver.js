const { getInscriptions, createInscription, getInscriptionsByStudentId, approveInscription } = require('../../controllers/inscriptions');

const inscriptionResolver = {
  Query: {
    getInscriptions,
    getInscriptionsByStudentId
  },
  Mutation: {
    createInscription,
    approveInscription
  },
}

module.exports = {
    inscriptionResolver,
};
