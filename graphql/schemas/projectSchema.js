const { gql } = require('apollo-server-express')

const projectSchema = gql`
  type Project {
    _id: ID
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Int!
    startDate: String
    endDate: String
    leader: User!
    status: Status
    phase: Phase
  }

  enum Status {
    ACTIVE
    INACTIVE
  }

  enum Phase {
    STARTED
    IN_PROGRESS
    FINISHED
  }
`

module.exports = { 
  projectSchema,
}

