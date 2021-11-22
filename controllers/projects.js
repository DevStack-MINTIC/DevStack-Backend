const { Project } = require("../models");

const getProjects = async (root, args) => {
  try {
    const projects = await Project.find().populate("leader");
    return projects;
  } catch (error) {
    throw new Error(`Error al traer los proyectos: ${error}`);
  }
};

const createProject = async (root, args, req) => {
  try {
    const { name, generalObjective, specificObjectives, budget } = args;
    await Project.create({
      name,
      generalObjective,
      specificObjectives,
      budget,
      leader: req.user._id,
    });
    return "El proyecto se creo correctamente";
  } catch (error) {
    throw new Error(`Error al crear el proyecto: ${error}`);
  }
};

const updateProject = async (root, args, req) => {
  try {
    const { _id, name, generalObjective, specificObjectives, budget} = args;
    await Project.findOneAndUpdate({ _id }, {
      name,
      generalObjective,
      specificObjectives,
      budget,
    }, { new: true }).populate("leader");
    return "El proyecto se actualizó correctamente";
  } catch (error) {
    throw new Error(`Error al actualizar el proyecto: ${error}`);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
};
