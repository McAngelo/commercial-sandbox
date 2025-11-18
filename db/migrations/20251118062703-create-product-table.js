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
    await queryInterface.createTable('product', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      title: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      isFeatured: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
      },
      productImage: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
      },
      price: {
          type: Sequelize.DECIMAL,
          allowNull: false,
      },
      shortDescription: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      productUrl: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      category: {
          type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tags: {
          type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdBy: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'admin_user',
              key: 'id',
          },
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
    await queryInterface.dropTable('product');
  }
};
