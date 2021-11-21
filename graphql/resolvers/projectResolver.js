const { getProjects, createProject, updateProject} = require('../../controllers/projects');

const projectResolver = {
  Query: {
    getProjects
  },
  Mutation: {
    createProject,
    updateProject
  },
}

module.exports = {
    projectResolver,
};
