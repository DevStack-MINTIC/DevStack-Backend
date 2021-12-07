const { User } = require("../models");
const { generatePasswordEncrypted } = require("../helpers/generator");

const getUsers = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(!["ADMIN", "LEADER"].includes(user.role)) throw new Error("Rol no tiene permitido ver los usuarios");
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserState = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    if(!["ADMIN", "LEADER"].includes(user.role)) throw new Error("Rol no autorizado");

    const { _id, state } = args;
    if (user.role === "LEADER" && state === "NOT_AUTHORIZED") throw new Error("El lider no tiene permitido esta acción");
    
    await User.findOneAndUpdate({ _id }, {
      state,
    }, { new: true });
    return "El usuario se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (root, args, req) => {
  try {
    const { fullName, password } = args;
    const id = req.user._id;

    const updateObject = {};
    if (fullName) updateObject["fullName"] = fullName;
    if (password) updateObject["password"] = generatePasswordEncrypted(password);

    await User.findOneAndUpdate({ _id: id }, updateObject, { new: true });
    return "El usuario se actualizó correctamente";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserState,
  updateUser,
};
