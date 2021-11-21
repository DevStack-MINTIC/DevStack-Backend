const { User } = require('../../models');
const { currentUser, register, login } = require('../../controllers/auth');

const userResolver = {
  Query: {
    currentUser,
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(`Error al traer los usuarios: ${error}`);
      }
    },
    getUser: async (root, args) => {
      try {
        const { id } = args;
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error(`Error al traer usuario: ${error}`);
      }
    }
  },
  Mutation: {
    register,
    login,
    updateUser: async (root, args) => {
      try {
        const user = await User.findOneAndUpdate({ _id: args.id }, {
            name: args.name,
            email: args.email,
            password: args.password
        }, { new: true });
        return user;
      } catch (error) {
        throw new Error(`Error al actualizar usuario: ${error}`);
      }
    },
    deleteUser: async (root, args) => {
      try {
        const user = await User.findOneAndDelete({ _id: args.id });
        return user;
      } catch (error) {
        throw new Error(`Error al eliminar usuario: ${error}`);
      }
    }
  }
}

module.exports = {
    userResolver,
};
