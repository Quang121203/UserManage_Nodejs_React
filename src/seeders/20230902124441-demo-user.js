'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [
      {
        username: 'John Doe',
        email: 'quang@gamil.com',
        password: '123'
      },
      {
        username: 'John Doe 2',
        email: 'quang@gamil.com',
        password: '123'
      },
      {
        username: 'John Doe 3',
        email: 'quang@gamil.com',
        password: '123'
      }],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
