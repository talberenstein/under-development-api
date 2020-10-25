'use strict';

const uuid = require('uuid').v4

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Tickets', [
      {
      id: uuid(),
      details: 'Ticket test',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        id: uuid(),
        details: 'Ticket2 test2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        details: 'Ticket3 test3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Tickets', null, {});

  }
};
