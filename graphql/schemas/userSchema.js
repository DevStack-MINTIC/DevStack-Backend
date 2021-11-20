const { gql } = require('apollo-server-express')

const userSchema = gql`
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type User {
    uid: ID!
    name: String!
    email: String!
    role: String!
    state: String!
  }

  type Mutation {
    createUser(name: String!, age: Int!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: Int): User
    deleteUser(id: ID!): User
  }
`

module.exports = { 
  userSchema,
}

