const { gql } = require('apollo-server-express')

const inscriptionSchema = gql`
  type Query {
    getInscriptions: [Inscription]!
  }

  type Inscription {
    _id: ID!
    projectId: Project
    studentId: User
    status: Status
    admissionDate: String
    departureDate: String
  }

  enum Status {
    ACCEPTED
    REJECTED
  }

  type Mutation {
    createInscription(projectId: ID!): String!
    approveInscription(_id: ID!): String!
  }
`

module.exports = { 
  inscriptionSchema,
}

