const { getInscriptions, createInscription, updateInscription } = require('../../controllers/inscriptions');

const inscriptionResolver = {
  Query: {
    getInscriptions
  },
  Mutation: {
    createInscription,
    updateInscription
  },
}

module.exports = {
    inscriptionResolver,
};
