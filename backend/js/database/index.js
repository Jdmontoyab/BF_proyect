const Sequelize = require("sequelize");
require('dotenv').config();
const database = {};

const sequelize = new Sequelize("datawarehouse", "root", "CONFIG_PASSWORD", {
  dialect: "mysql",
  host: "localhost"
});

sequelize.authenticate().then(() => {
}).catch(error => {
  console.log(error);
});

database.sequelize = sequelize;

module.exports = database;