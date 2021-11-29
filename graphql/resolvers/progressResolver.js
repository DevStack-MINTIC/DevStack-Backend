const { getProgressByProjectId, createProgress, updateProgress, updateObsevation} = require('../../controllers/progress');

const progressResolver = {
  Query: {
    getProgressByProjectId
  },
  Mutation: {
    createProgress,
    updateProgress,
    updateObsevation
  },
}

module.exports = {
    progressResolver,
};
