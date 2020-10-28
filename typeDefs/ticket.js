const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket {
        id: ID!
        owner: User!
        ticket_category: Ticket_category!
        event: Event
        favorite: [Favorite]
        reported: Boolean!
        details: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Mutation {
        createTicket(details: String, id_ticket_category: ID!, eventid: ID!): Ticket! @auth
        updateTicket(id: ID!, details: String, id_ticket_category: ID!, reported: Boolean!, eventid: ID!): Ticket! @auth
        deleteTicket(id: ID!): Boolean! @auth
        markAsFavorite(id: ID!): Favorite! @auth
        unMarkAsFavorite(id: ID!): Boolean! @auth
        reportTicket(id: ID!): Boolean! @admin
        unReportTicket(id: ID!): Boolean! @admin
    }

    extend type Subscription{
        ticketCreated: Ticket!
        ticketFavorited: Favorite!
        ticketUnfavorited: Favorite!
    }

    extend type Query {
        ticket(id: ID!): Ticket!
        allTickets(
            category: String, 
            reported: Boolean, 
            perPage: Int, 
            page: Int
            ): [Ticket!]! @auth
        allTicketsByMe(perPage: Int, page: Int): [Ticket!]! @auth
    }
`
