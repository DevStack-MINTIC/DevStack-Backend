const { User } = require("../models");
const { generatePasswordEncrypted } = require("../helpers/generator");

const getUsers = async (root, args, req) => {
  try {
    const role = req.user.role;
    if(!["ADMIN", "LEADER"].includes(role)) throw new Error("Rol no autorizado");
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error al traer los usuarios: ${error}`);
  }
};

const getUserById = async (root, args, req) => {
  try {
    const role = req.user.role;
    if(!["ADMIN", "LEADER"].includes(role)) throw new Error("Rol no autorizado");
    const { _id } = args;
    const user = await User.findById(_id);
    return user;
  } catch (error) {
    throw new Error(`Error al traer usuario: ${error}`);
  }
};

const updateUserStatus = async (root, args, req) => {
  try {
    const { _id, status } = args;
    const role = req.user.role;
    if(!["ADMIN", "LEADER"].includes(role)) throw new Error("Rol no autorizado");
    if (role === "LEADER" && status === "NOT_AUTHORIZED") throw new Error("El lider no tiene permitido esta acción");
    
    await User.findOneAndUpdate({ _id }, {
      status,
    }, { new: true });
    return "El usuario se actualizó correctamente";
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error}`);
  }
};

const updateUser = async (root, args, req) => {
  try {
    const { fullName, password } = args;
    const id = req.user._id;
    await User.findOneAndUpdate({ id }, {
      fullName,
      password: generatePasswordEncrypted(password),
    }, { new: true });
    return "El usuario se actualizó correctamente";
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error}`);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserStatus,
  updateUser,
};
