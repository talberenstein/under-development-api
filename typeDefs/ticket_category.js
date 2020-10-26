const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket_category {
        id: ID!
        name: String!
        description: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Query {
        allTicketCategories: [Ticket_category!]!
    }
`
