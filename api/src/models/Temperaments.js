const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Temperament", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    temperament: { type: DataTypes.STRING, allowNull: false },
  });
};
