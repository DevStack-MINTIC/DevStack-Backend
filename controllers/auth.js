const bcrypt = require('bcryptjs');

const { User } = require("../models");
const {generatePasswordEncrypted, generateJWT} = require("../helpers/generator");
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
      throw new Error('El usuario ya se encuentra registrado con el correo ingresado');
    }

    const userIN = await User.findOne({ identificationNumber });
    if (userIN) {
      throw new Error('El usuario ya se encuentra registrado con el numero de identificación ingresado');
    }

    const newUser = await User.create({
      email,
      identificationNumber,
      fullName,
      password: generatePasswordEncrypted(password),
      role
    });

    return JSON.stringify({
      token: await generateJWT(newUser._id),
      user: {
        id: newUser._id,
        role: newUser.role
      }
    });
  } catch (error) {
    throw new Error(`Error al registrar usuario: ${error}`);
  }
};

const login = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('El usuario no existe');
    }

    if (user.state === "PENDING") {
      throw new Error("Usuario pendiente de autorización. Contactar con el admistrador");
    }

    if (user.state === "NOT_AUTHORIZED") {
      throw new Error("Usuario no autorizado");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Contraseña incorrecta');
    }

    return JSON.stringify({
      token: await generateJWT(user._id),
      user: {
        id: user._id,
        role: user.role
      }
    });
  } catch (error) {
    throw new Error(`Error al logear usuario: ${error}`);
  }
};

module.exports = {
  currentUser,
  register,
  login,
};
