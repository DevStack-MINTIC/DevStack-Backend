const { User } = require("../models");
const { generatePasswordEncrypted } = require("../helpers/generator");

const getUsers = async (root, args, req) => {
  try {
    // const role = req.user.role;
    // if(!["ADMIN", "LEADER"].includes(role)) throw new Error("Rol no autorizado");
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error al traer los usuarios: ${error}`);
  }
};

const getUserById = async (root, args, req) => {
  try {
    const user = await User.findById(req.user._id);
    return user;
  } catch (error) {
    throw new Error(`Error al traer usuario: ${error}`);
  }
};

const updateUserStatus = async (root, args, req) => {
  try {
    // const { _id, state } = args;
    // const role = req.user.role;
    // if(!["ADMIN", "LEADER"].includes(role)) throw new Error("Rol no autorizado");
    // if (role === "LEADER" && state === "NOT_AUTHORIZED") throw new Error("El lider no tiene permitido esta acción");
    
    await User.findOneAndUpdate({ _id }, {
      state,
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
