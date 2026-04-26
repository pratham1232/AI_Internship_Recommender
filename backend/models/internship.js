const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Internship = sequelize.define("Internship", {
  title:       { type: DataTypes.STRING, allowNull: false },
  company:     { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT,   allowNull: false },
  skills:      { type: DataTypes.STRING, allowNull: false },
  location:    { type: DataTypes.STRING },
  duration:    { type: DataTypes.STRING },
});

module.exports = Internship;
