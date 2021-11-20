const { User } = require('../../models/user');

const userResolver = {
  Query: {
    getUsers: async () => {
      try {
        // const users = await User.find();
        // return users;
        return [];
      } catch (error) {
        throw new Error(`Error al traer usuarios: ${error}`);
      }
    },
    getUser: async (root, args) => {
      try {
        // const user = await User.findById(args.id);
        // return user;
        return {name: 'Felipe'};
      } catch (error) {
        throw new Error(`Error al traer usuario: ${error}`);
      }
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const newUser = new User({
        name: args.name,
        email: args.email,
        password: args.password
      });
      try {
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`);
      }
    },
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
