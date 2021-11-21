const { currentUser, register, login } = require('../../controllers/auth');
const { getUsers, getUserById, updateUser} = require('../../controllers/users');

const userResolver = {
  Query: {
    currentUser,
    getUserById,
    getUsers
  },
  Mutation: {
    register,
    login,
    updateUser
  }
}

module.exports = {
    userResolver,
};
