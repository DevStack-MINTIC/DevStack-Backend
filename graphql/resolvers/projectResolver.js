const { getProjects, getProjectById, createProject, updateProject } = require('../../controllers/projects');

const projectResolver = {
  Query: {
    getProjects,
    getProjectById
  },
  Mutation: {
    createProject,
    updateProject
  },
}

module.exports = {
    projectResolver,
};
