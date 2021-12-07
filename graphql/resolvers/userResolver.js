const { currentUser, register, login } = require('../../controllers/auth');
const { getUsers, getUserById, updateUserState, updateUser } = require('../../controllers/users');

const userResolver = {
  Query: {
    currentUser,
    getUserById,
    getUsers
  },
  Mutation: {
    register,
    login,
    updateUserState,
    updateUser
  }
}

module.exports = {
    userResolver,
};
