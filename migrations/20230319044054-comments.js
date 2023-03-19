/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Comments',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'postId' ,
          references: {
            model: 'Posts',
            key: 'id',
          },
   

        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          }
        },
        commentContent: {
          type: Sequelize.STRING,
          allowNull: false,

        },

  

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdBy: {
          type: Sequelize.STRING,
        },
        updatedBy: {
          type: Sequelize.STRING,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
        deletedBy: {
          type: Sequelize.STRING,
        },


      });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Comments');

  }
};
