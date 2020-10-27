const express = require('express')
const { ApolloServer, PubSub } = require('apollo-server-express')
const models = require('./models')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { getAuthUser } = require('./utils')
const http = require('http')
const AuthDirective = require('./directives/auth')
const { AdminDirective } = require('./directives')

const app = express()
const port = 4000

const pubsub = new PubSub()


const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective,
        admin: AdminDirective
    },
    playground: true,
    context: ({ req, connection }) => {
        if(connection) {
            return { models, pubsub };
        } else {
            const authUser = getAuthUser(req);

            return { models, authUser, pubsub }
        }
    }
})

server.applyMiddleware({ app, cors: true})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({port}, () => {
    console.log(
        `Server ready at hhtp://localhost:${port}${server.graphqlPath}`
        );
    console.log(
        `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
        );      
}
)