const { 
  getProjects, 
  getProjectById, 
  createProject, 
  approveProject, 
  updateProject 
} = require('../../controllers/projects');

const projectResolver = {
  Query: {
    getProjects,
    getProjectById
  },
  Mutation: {
    createProject,
    approveProject,
    updateProject
  },
}

module.exports = {
  projectResolver,
};
