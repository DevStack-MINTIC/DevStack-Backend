const { makeExecutableSchema } = require('@graphql-tools/schema');

const { userSchema } = require('./schemas/userSchema');
const { projectSchema } = require('./schemas/projectSchema');
const { inscriptionSchema } = require('./schemas/inscriptionSchema');
const { progressSchema } = require('./schemas/progressSchema');

const { userResolver } = require('./resolvers/userResolver');
const { projectResolver } = require('./resolvers/projectResolver');
const { inscriptionResolver } = require('./resolvers/inscriptionResolver');
const { progressResolver } = require('./resolvers/progressResolver');

const graphqlSchemas = new makeExecutableSchema({
  typeDefs: [
    userSchema,
    projectSchema,
    inscriptionSchema,
    progressSchema,
  ],
  resolvers: [
    userResolver,
    projectResolver,
    inscriptionResolver,
    progressResolver,
  ]
});

module.exports = {
  graphqlSchemas,
};