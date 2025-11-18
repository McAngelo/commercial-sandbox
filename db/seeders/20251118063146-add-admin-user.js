'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let password = process.env.ADMIN_PASSWORD;
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert('admin_user', [
        {
            userType: '0',
            firstName: 'Michael',
            lastName: 'Johnson',
            email: process.env.ADMIN_EMAIL,
            password: hashPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('admin_user', { userType: '0' }, {});
  }
};
