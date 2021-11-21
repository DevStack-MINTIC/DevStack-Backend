const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("express-jwt");

const { dbConnection } = require("../db/config");
const { graphqlSchemas } = require("../graphql");
class Server {
  constructor() {
    this.port = process.env.PORT || 8080;
    this.path = { apiPath: "/api/devstack" };
    this.app = express();
    this.auth = jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ["HS256"],
      credentialsRequired: false,
    });
    this.serverApollo = new ApolloServer({ 
      schema: graphqlSchemas,
      context: ({ req }) => {
        const user = req.user ? req.user : null;
        return { user };
      },
    });

    // Config Database
    this.connectDB();

    // Config middlewares
    this.middlewares();

    // Config Routes
    this.initGraphqlServer();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(this.auth);
  }

  async initGraphqlServer() {
    await this.serverApollo.start();
    this.serverApollo.applyMiddleware({ 
      app: this.app,
      path: this.path.apiPath,
      cors: true
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en http://localhost:${this.port}${this.path.apiPath}`);
    });
  }
}

module.exports = Server;
