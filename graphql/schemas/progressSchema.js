const { gql } = require('apollo-server-express')

const progressSchema = gql`
  type Query {
    getProgressByProjectId(projectId: ID!): [Progress]
  }

  type Progress {
    _id: ID
    projectId: Project!
    progressDate: String
    description: String!
    observation: String
  }

  type Mutation {
    createProgress(
      projectId: ID!
      description: String!
    ): Progress
    updateObsevation(
      _id: ID!
      observation: String!
    ): Progress
  }
`

module.exports = { 
  progressSchema,
}

