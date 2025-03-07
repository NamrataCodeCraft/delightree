const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const PORT = process.env.PORT || 4000
const databaseConnection = require('./config/database')

async function serverStart() {
    const app = express();
    app.use(express.json());
    databaseConnection()
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => { console.log(`server is running on ${PORT}`) });
}
serverStart();



