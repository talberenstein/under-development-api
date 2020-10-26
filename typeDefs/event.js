const { gql } = require('apollo-server-express')


module.exports = gql`
    type Event {
        id: ID!
        name: String!
        description: String!
        canceled: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Query {
        allEvents: [Event!]!
    }
`
