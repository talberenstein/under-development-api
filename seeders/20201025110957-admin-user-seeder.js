'use strict';

const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('Users', [{
       id: uuid(),
       username: 'talib',
       email: 'user2@gmail.com',
       password: await bcrypt.hash('password', 10),
       createdAt: new Date(),
       updatedAt: new Date(),
     }], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Users', null, {});

  }
};
