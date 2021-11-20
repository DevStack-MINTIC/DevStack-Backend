const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { dbConnection } = require("../db/config");
const { graphqlSchemas } = require("../graphql");
class Server {
  constructor() {
    this.app = express();
    this.serverApollo = new ApolloServer({ schema: graphqlSchemas });

    this.port = process.env.PORT || 8080;
    this.path = {
      graphqlPath: "/api/graphql",
    };

    // Config Database
    this.connectDB();

    // Config Routes
    this.initGraphqlRoute();
  }

  async connectDB() {
    await dbConnection();
  }

  async initGraphqlRoute() {
    await this.serverApollo.start();
    this.serverApollo.applyMiddleware({ 
      app: this.app,
      path: this.path.graphqlPath,
      cors: true
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en http://localhost:${this.port}/api/graphql`);
    });
  }
}

module.exports = Server;
