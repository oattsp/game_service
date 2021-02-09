'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Games.init({
    code_game: DataTypes.STRING,
    countdown: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    start_at: DataTypes.STRING,
    end_at: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Games',
    underscored: true,
    underscoreAll: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Games;
};