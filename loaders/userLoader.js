const DataLoader = require('dataloader');
const models =  require('../models');


const batchUserLoader = async (ids,  models ) => {
    const user = await models.User.findAll({
        where: { id: { [models.Sequelize.Op.in]: ids } }

    })

    return ids.map(id => user.find(user => user.id === id))
}

const userLoader = () => new DataLoader(ids => batchUserLoader( ids, models ))

module.exports = userLoader;