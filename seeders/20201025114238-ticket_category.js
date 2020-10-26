'use strict';

const uuid = require('uuid').v4

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Ticket_categories', [
      {
      id: uuid(),
      name: 'Category test',
      description: 'NO DESCRIPTION',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      name: 'Category2 test2',
      description: 'NO DESCRIPTION2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      name: 'Category3 test3',
      description: 'NO DESCRIPTION3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  
  
  ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Ticket_categories', null, {});

  }
};
