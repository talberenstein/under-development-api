'use strict';

const uuid = require('uuid').v4

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Ticket_categories', [{
      id: uuid(),
      name: 'Category test',
      description: 'NO DESCRIPTION',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Ticket_categories', null, {});

  }
};
