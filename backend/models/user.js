const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name cannot be empty
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, // Ensures it's a real email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Password cannot be empty
  },
  role: {
    type: DataTypes.ENUM("student", "recruiter", "admin"), // Restricts to these 3 options
    defaultValue: "student", // Default role if not provided
  },
}, {
  timestamps: true, // Explicitly enable createdAt and updatedAt
});

module.exports = User;