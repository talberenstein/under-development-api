//Since I want to generate QR I should install a pkg, refering to its in the Model Ticket

const { ApolloError, ForbiddenError } = require("apollo-server-express")

module.exports = {

    Query: {
        async ticket(parent, { id }, { models } ) {
            const ticket = await models.Ticket.findByPk(id)

            if(!ticket){
                throw new ApolloError('No Ticket found')
            }

            return ticket
        },

        allTickets ( parent, args , {models} ) {
            return models.Ticket.findAll()
        }
    },
    Mutation: {

        //CREATE TICKET
        createTicket ( parent, args, { models, authUser }){
            return models.Ticket.create({
                ...args,
                userid: authUser.id,
            })
        },

        //UPDATE TICKET
        async updateTicket (parent, { id, details, id_ticket_category, reported, eventid}, {models, authUser}){
            const ticket = await models.Ticket.findByPk(id)
            
            if(authUser.id !== ticket.userid){
                throw new ForbiddenError('You can only edit your own tickets')
            }

            await ticket.update({ details, id_ticket_category, reported, eventid })
            return ticket
        },

        //MARK AS FAVORITE
        async markAsFavorite (parent, { id }, { models, authUser}) {
            const [favorite] = await models.Favorite.findOrCreate({
                where: {
                    ticketId: id,
                    userId: authUser.id
                }
            })

            return favorite

        }
    },


    //get owner and category query ticket
    Ticket: {
        favorite(ticket, args, {models}){
            return models.Favorite.findAll({ where: { ticketId: ticket.id}})
        },
        owner(ticket) {
            return ticket.getUser()
        },
        ticket_category(ticket) {
            return ticket.getTicket_category()
        },
        event(ticket){
            return ticket.getEvent()
        },

    },
}