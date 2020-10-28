
//LOADERS HAVE TO BE DEFINED IN LOADERS(index), RESOLVERS AND INDEX.JS MAIN




const DataLoader = require('dataloader');
const models =  require('../models');


const batchUser = async (ids,  models ) => {
    const user = await models.User.findAll({
        where: { id: { [models.Sequelize.Op.in]: ids } }

    })

    return ids.map(id => user.find(user => user.id === id))
}

const UserLoader = () => new DataLoader(ids => batchUser( ids, models ))

module.exports = UserLoader;