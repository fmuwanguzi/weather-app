'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.weather.belongsToMany(models.user, {through: 'usersWeathers'})
      //models.weather.belongsTo(models.user)
    }
  };
  weather.init({
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    temperature: DataTypes.FLOAT,
    feels_like: DataTypes.FLOAT,
    min_temp: DataTypes.FLOAT,
    max_temp: DataTypes.FLOAT,
    humidity: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'weather',
  });
  return weather;
};