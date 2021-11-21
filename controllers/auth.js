const bcrypt = require('bcryptjs');

const { User } = require("../models");
const generateJWT = require("../helpers/generateJWT");

const currentUser = async (root, args, req) => {
  if (!req.user) {
    throw new Error('El usuario no se encuentra autenticado');
  }
  return User.findById(req.user._id);
}

const register = async (root, args) => {
  try {
    const { 
      email, 
      identificationNumber, 
      fullName, 
      password, 
      role
    } = args;

    const user = await User.findOne({ email });
    if (user) {
      throw new Error('El usuario ya existe');
    }

    const salt = bcrypt.genSaltSync(10);
    const newUser = await User.create({
      email,
      identificationNumber,
      fullName,
      password: bcrypt.hashSync(password, salt),
      role
    });

    return await generateJWT(newUser._id);
  } catch (error) {
    throw new Error(`Error al registrar al usuario: ${error}`);
  }
};

const login = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('El usuario no existe');
    }

    // if (user.state === "PENDING") {
    //   throw new Error("Usuario pendiente de autorización. Contactar con el admistrador");
    // }

    // if (user.state === "NO_AUTHORIZED") {
    //   throw new Error("Usuario no autorizado");
    // }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Contraseña incorrecta');
    }

    return await generateJWT(user._id);
  } catch (error) {
    throw new Error(`Error al logear al usuario: ${error}`);
  }
};

module.exports = {
  currentUser,
  register,
  login,
};
