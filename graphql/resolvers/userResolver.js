const { currentUser, register, login } = require('../../controllers/auth');
const { getUsers, getUserById, updateUserStatus, updateUser } = require('../../controllers/users');

const userResolver = {
  Query: {
    currentUser,
    getUserById,
    getUsers
  },
  Mutation: {
    register,
    login,
    updateUserStatus,
    updateUser
  }
}

module.exports = {
    userResolver,
};
