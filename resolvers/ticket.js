//Since I want to generate QR should I install a pkg, refering to its in the Model Ticket

module.exports = {
    Mutation: {
        createTicket ( parent, args, { models, authUser }){
            console.log(authUser)
            return models.Ticket.create({
                ...args,
                reported: false,
                userid: authUser.id,
                details: "asdf"
            })
        }
    }
}