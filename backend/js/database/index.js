const Sequelize = require("sequelize");
require('dotenv').config();
const database = {};

const sequelize = new Sequelize("datawarehouse", "root", "Ingagr18", {
  dialect: "mysql",
  host: "localhost"
});

sequelize.authenticate().then(() => {
  console.log('Conexión Establecida');
}).catch(error => {
  console.log(error);
});

database.sequelize = sequelize;

module.exports = database;