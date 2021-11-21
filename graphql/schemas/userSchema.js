const { gql } = require('apollo-server-express')

const userSchema = gql`
  type Query {
    currentUser: User
    getUser(id: ID!): User
    getUsers: [User]
  }

  type User {
    _id: ID
    email: String!
    identificationNumber: String!
    fullName: String!
    password: String!
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
    register(
      email: String!, 
      identificationNumber: String!, 
      fullName: String!, 
      password: String!, 
      role: Role!
      ): String
    login(email: String!, password: String!): String
    updateUser(id: ID!, name: String, email: String, password: Int): User
    deleteUser(id: ID!): User
  }
`

module.exports = { 
  userSchema,
}

