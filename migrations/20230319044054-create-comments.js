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
          field: 'postId',
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
        content: {
          type: Sequelize.STRING,
        },


        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        created_by: {
          type: Sequelize.STRING,
 
        },
        updated_by: {
          type: Sequelize.INTEGER,
   
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

    await queryInterface.dropTable('Comments');

  }
};
