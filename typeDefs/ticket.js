const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket {
        id: ID!
        owner: User!
        ticket_category: Ticket_category!
        event: Event!
        favorite: [Favorite]
        reported: Boolean!
        details: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Mutation {
        createTicket(details: String, id_ticket_category: ID!, eventid: ID!): Ticket!
        updateTicket(id: ID!, details: String, id_ticket_category: ID!, reported: Boolean!, eventid: ID!): Ticket!
        markAsFavorite(id: ID!): Favorite!
    }

    extend type Query {
        ticket(id: ID!): Ticket!
        allTickets: [Ticket!]!
    }
`
