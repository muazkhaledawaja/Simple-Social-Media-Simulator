/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,

        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        created_by: {
          type: Sequelize.STRING,
        },
        updated_at: {
          type: Sequelize.STRING,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
        deleted_by: {
          type: Sequelize.STRING,
        },

        


      });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Users');

  }
};
