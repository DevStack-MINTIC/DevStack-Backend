const { gql } = require('apollo-server-express')

const progressSchema = gql`
  type Progress {
    _id: ID
    projectId: Project
    progressDate: String
    description: String
    observation: String
  }
`

module.exports = { 
  progressSchema,
}

