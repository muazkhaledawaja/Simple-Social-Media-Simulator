'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Block',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        blockerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'blocker_id',
          references: {
            model: 'Users',
            key: 'id',
          }
        },
        blockedId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'blocked_id',
          references: {
            model: 'Users',
            key: 'id',
          }
        },
        status: {
          type: Sequelize.ENUM('BLOCKED', 'UNBLOCKED'),
          defaultValue: 'UNBLOCKED',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'created_at',
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'updated_at',
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'deleted_at',
        },
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Block');
  }
};
