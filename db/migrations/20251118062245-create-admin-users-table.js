'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('admin_user', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      userType: {
          type: Sequelize.ENUM('0', '1', '2'),
      },
      firstName: {
          type: Sequelize.STRING,
      },
      lastName: {
          type: Sequelize.STRING,
      },
      email: {
          type: Sequelize.STRING,
          unique: true,
      },
      password: {
          type: Sequelize.STRING,
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
      deletedAt: {
          type: Sequelize.DATE,
      },
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('admin_user');
  }
};
