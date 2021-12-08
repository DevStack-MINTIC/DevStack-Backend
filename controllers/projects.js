const { Project, User } = require("../models");

const getProjects = async (root, args, req) => {
  try {
    const projects = await Project.find().populate("leader");
    return projects;
  } catch (error) {
    throw new Error(error);
  }
};

const getProjectById = async (root, args, req) => {
  try {
    const { _id } = args;
    const project = await Project.findById(_id).populate("leader");
    return project;
  } catch (error) {
    throw new Error(error);
  }
};

const createProject = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "LEADER") throw new Error("El rol no puede crear proyectos");
    
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
    throw new Error(error);
  }
};

const approveProject = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "ADMIN") throw new Error("El rol no puede aprobar el proyecto");

    const { _id } = args;
    await Project.findOneAndUpdate({ _id }, {
      startDate: Date.now(),
      status: "ACTIVE",
      phase: "STARTED"
    }, { new: true }).populate("leader");
    return "El proyecto se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

const updateProject = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.role !== "LEADER") throw new Error("El rol no puede actualizar el proyecto");
    const { _id, name, generalObjective, specificObjectives, budget} = args;
    await Project.findOneAndUpdate({ _id }, {
      name,
      generalObjective,
      specificObjectives,
      budget,
    }, { new: true }).populate("leader");
    return "El proyecto se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  approveProject,
  updateProject,
};
