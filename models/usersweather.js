'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersWeather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //models.weather.belongsToMany(models.user,  {through: 'userWeather'})
      //models.usersWeather.belongsTo(models.user)
    }
  };
  usersWeather.init({
    userId: DataTypes.INTEGER,
    weatherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersWeathers',
  });
  return usersWeather;
};