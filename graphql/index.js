const { makeExecutableSchema } = require('@graphql-tools/schema');
const { userSchema } = require('./schemas/userSchema');
const { userResolver } = require('./resolvers/userResolver');

const graphqlSchemas = new makeExecutableSchema({
  typeDefs: [
    userSchema
  ],
  resolvers: [
    userResolver
  ]
});

module.exports = {
  graphqlSchemas,
};