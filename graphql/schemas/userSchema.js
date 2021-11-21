const { gql } = require('apollo-server-express')

const userSchema = gql`
  type Query {
    currentUser: User
    getUserById(_id: ID!): User
    getUsers: [User]
  }

  type User {
    _id: ID
    email: String!
    identificationNumber: String!
    fullName: String!
    role: Role!
    status: Status
  }

  enum Role {
    ADMIN
    LEADER
    STUDENT
  }

  enum Status {
    PENDING
    AUTHORIZED
    NOT_AUTHORIZED
  }

  type Mutation {
    register(email: String!, identificationNumber: String!, fullName: String!, password: String!, role: Role!): String
    login(email: String!, password: String!): String
    updateUser(fullName: String!, password: String!): User
  }
`

module.exports = { 
  userSchema,
}

