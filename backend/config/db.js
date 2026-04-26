const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("internshipDB", "root", "ranu@1122", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
  } catch (error) {
    console.error("DB Error:", error);
  }
};

module.exports = { sequelize, connectDB };