const { gql } = require('apollo-server-express')

const projectSchema = gql`
  type Query {
    getProjects: [Project]!
    getProjectById(id: ID!): Project
  }

  type Project {
    _id: ID!
    name: String
    generalObjective: String
    specificObjectives: [String]
    budget: Int
    startDate: String
    endDate: String
    leader: User
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

  type Mutation {
    createProject(
      name: String!
      generalObjective: String!
      specificObjectives: [String]!
      budget: Int!
    ): String!
    updateProject(
      _id: ID!
      name: String
      generalObjective: String
      specificObjectives: [String]
      budget: Int
    ): String!
  }
`

module.exports = { 
  projectSchema,
}

