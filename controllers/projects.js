const { Project } = require("../models");

const getProjects = async (root, args) => {
  try {
    const projects = await Project.find();
    return projects;
  } catch (error) {
    throw new Error(`Error al traer los usuarios: ${error}`);
  }
};

const createProject = async (root, args, req) => {
  try {
    const { name, generalObjective, specificObjectives, budget } = args;
    const project = await Project.create({
      name,
      generalObjective,
      specificObjectives,
      budget,
      leader: req.user._id,
    });
    return project;
  } catch (error) {
    throw new Error(`Error al traer usuario: ${error}`);
  }
};

const updateProject = async (root, args, req) => {
  try {
    const { _id, name, generalObjective, specificObjectives, budget} = args;
    const project = await Project.findOneAndUpdate({ _id }, {
      name,
      generalObjective,
      specificObjectives,
      budget,
    }, { new: true });
    return project;
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error}`);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
};
