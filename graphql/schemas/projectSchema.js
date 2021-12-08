const { gql } = require('apollo-server-express')

const projectSchema = gql`
  type Query {
    getProjects: [Project]!
    getProjectById(_id: ID!): Project
  }

  type Project {
    _id: ID!
    name: String
    generalObjective: String
    specificObjectives: [String]
    budget: String
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
      budget: String!
    ): String!
    approveProject(_id: ID!): String!
    updateProject(
      _id: ID!
      name: String
      generalObjective: String
      specificObjectives: [String]
      budget: String
    ): String!
  }
`

module.exports = { 
  projectSchema,
}

