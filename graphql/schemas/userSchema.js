const { gql } = require('apollo-server-express')

const userSchema = gql`
  type Query {
    currentUser: User
    getUserById: User
    getUsers: [User]
  }

  type User {
    _id: ID!
    email: String
    identificationNumber: String
    fullName: String
    role: Role
    state: State
  }

  enum Role {
    ADMIN
    LEADER
    STUDENT
  }

  enum State {
    PENDING
    AUTHORIZED
    NOT_AUTHORIZED
  }

  type Mutation {
    register(email: String!, identificationNumber: String!, fullName: String!, password: String!, role: Role!): String
    login(email: String!, password: String!): String
    updateUserState(_id: ID!, state: State!): String
    updateUser(fullName: String, password: String): String
  }
`

module.exports = { 
  userSchema,
}

