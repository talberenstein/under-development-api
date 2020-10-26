module.exports = {
    Favorite: {
        user ( favorite, args, { models }){
            console.log("FAVORITE!!!: "+favorite)
            return models.User.findByPk(favorite.userId)
        },
        ticket ( favorite, args, { models }){
            return models.Ticket.findByPk(favorite.ticketId)
        }
    }
}