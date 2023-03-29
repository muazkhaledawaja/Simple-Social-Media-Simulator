/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('FriendRequest',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        senderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'sender_id',
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        recipientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'recipient_id',
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        isAccepted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field: 'is_accepted',
          defaultValue: false,
        },
        status: {
          type: Sequelize.ENUM('ACCEPTED', 'DECLINED', 'PENDING'),
          defaultValue: 'PENDING',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'created_at',
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'updated_at',
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'deleted_at',
        },
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FriendRequest');
  }
};
