'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comments.init({
    commentContent: DataTypes.STRING,
    isCommentedAt: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    commentTime: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    deletedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};