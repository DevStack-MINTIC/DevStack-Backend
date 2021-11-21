const { getProgressByProjectId, createProgress, updateObsevation} = require('../../controllers/progress');

const progressResolver = {
  Query: {
    getProgressByProjectId
  },
  Mutation: {
    createProgress,
    updateObsevation
  },
}

module.exports = {
    progressResolver,
};
