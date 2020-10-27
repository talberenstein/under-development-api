module.exports = {
    Favorite: {
        user ( favorite, args, { models }){
            return models.User.findByPk(favorite.userId)
        },
        ticket ( favorite, args, { models }){
            console.log("TICKET!!! " + models.Ticket.findByPk(favorite.ticketId))
            return models.Ticket.findByPk(favorite.ticketId)
        }
    }
}