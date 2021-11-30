const { getInscriptions, createInscription, approveInscription } = require('../../controllers/inscriptions');

const inscriptionResolver = {
  Query: {
    getInscriptions
  },
  Mutation: {
    createInscription,
    approveInscription
  },
}

module.exports = {
    inscriptionResolver,
};
