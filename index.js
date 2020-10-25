const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./models')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { getAuthUser } = require('./utils')

const app = express()
const port = 4000


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ req }) => {
        const authUser = getAuthUser(req) 

        return { models, authUser }
    }
})

server.applyMiddleware({ app, cors: true})

app.listen({port}, () => console.log(`Server ready at hhtp://localhost:${port}${server.graphqlPath}`))