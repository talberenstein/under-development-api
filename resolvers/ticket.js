//Since I want to generate QR I should install a pkg, refering to its in the Model Ticket

const { ApolloError, ForbiddenError, AuthenticationError } = require("apollo-server-express")
const { Favorite } = require("./favorite")

const TICKET_CREATED = "TICKET_CREADED";
const TICKET_FAVORITED = "TICKET_FAVORITED";
const TICKET_UNFAVORITED = "TICKET_UNFAVORITED";

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
        async createTicket ( parent, { details, id_ticket_category, eventid }, { models, authUser, pubsub }){

            const event = await models.Event.findByPk(eventid);
            const ticket = await models.Ticket.create({
                eventid,
                details,
                userid: authUser.id,
                id_ticket_category
            });

            pubsub.publish(TICKET_CREATED, { ticketCreated: ticket})

            return ticket
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

        //DELETE TICKET
        async deleteTicket(parent, { id }, {models, authUser}) {
            const ticket = await models.Ticket.findByPk(id)

            await ticket.destroy()
            return true;

            
        },

        //MARK AS FAVORITE
        async markAsFavorite (parent, { id }, { models, authUser, pubsub}) {
            const [favorite] = await models.Favorite.findOrCreate({
                where: {
                    ticketId: id,
                    userId: authUser.id
                }
            })

            pubsub.publish(TICKET_FAVORITED, { ticketFavorited: favorite })
            return favorite

        },

        //UNMARK AS FAVORITE
        async unMarkAsFavorite (parent, { id }, {models, authUser, pubsub}){
            const favorite = await models.Favorite.findOne({where: { ticketId: id, userId: authUser.id}})

            await favorite.destroy()

            pubsub.publish(TICKET_UNFAVORITED, { ticketUnfavorited: favorite })
            return true
        },

        //REPORT TICKET
        async reportTicket( parent, { id }, {models, authUser}){
            const ticket = await models.Ticket.findByPk(id)

            if(authUser.role !== 'ADMIN'){
                throw new ForbiddenError('ADMIN REQUIRED')
            }
            if(ticket.reported){
                throw new ApolloError('TICKET ALREADY REPORTED')
            }

            await ticket.update( {reported: true} )
            return true

        },

        //UNREPORT TICKET
        async unReportTicket( parent, { id }, {models, authUser}){
            const ticket = await models.Ticket.findByPk(id)

            if(authUser.role !== 'ADMIN'){
                throw new ForbiddenError('ADMIN REQUIRED')
            }

            if(!ticket.reported){
                throw new ApolloError('Ticket not reported')
            }

            await ticket.update ( {reported: false} )
            return true
        }

    },

    Subscription: {
        ticketCreated: {
            subscribe(parent, args, { pubsub }){
                return pubsub.asyncIterator(TICKET_CREATED)
            }
        },
        ticketFavorited: {
            subscribe(parent, args, { pubsub }){
                return pubsub.asyncIterator(TICKET_FAVORITED)
            }
        },
        ticketUnfavorited: {
            subscribe(parent, args, { pubsub }){
                return pubsub.asyncIterator(TICKET_UNFAVORITED)
            }
        }

    },


    //GETTERS FOR TICKETS!
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
            console.log("TICKET: !!! " + ticket.getEvent())
            return ticket.getEvent()
        },

    },
}