const { gql } = require('apollo-server-express')

const inscriptionSchema = gql`
  type Inscription {
    _id: ID
    projectId: Project!
    studentId: Role!
    status: Status!
    admissionDate: String
    departureDate: String
  }

  enum Status {
    ACCEPTED
    REJECTED
  }
`

module.exports = { 
  inscriptionSchema,
}

