const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Dog_Temperament", {
    DogId: { type: DataTypes.UUID, allowNull: false },
    TemperamentId: { type: DataTypes.INTEGER, allowNull: false },
  });
};
