//Since I want to generate QR should I install a pkg, refering to its in the Model Ticket

const { ApolloError, ForbiddenError } = require("apollo-server-express")

module.exports = {

    Query: {
        async ticket(parent, { id }, { models } ) {
            console.log(id)
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
        createTicket ( parent, args, { models, authUser }){
            return models.Ticket.create({
                ...args,
                userid: authUser.id,
            })
        },
        async updateTicket (parent, { id, details, id_ticket_category, reported}, {models, authUser}){
            const ticket = await models.Ticket.findByPk(id)
            
            if(authUser.id !== ticket.userid){
                throw new ForbiddenError('You can only edit your own tickets')
            }

            await ticket.update({ details, id_ticket_category, reported })

            return ticket
        }
    },

    //get owner and category query ticket
    Ticket: {
        owner(ticket) {
            return ticket.getUser()
        },
        ticket_category(ticket) {
            return ticket.getTicket_category()
        }

    },
}