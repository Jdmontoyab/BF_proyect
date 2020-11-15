const database = require("../index");

const crearProducto = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO PRODUCTOS (descripcion, precio) VALUES ("${body.descripcion}", ${body.precio});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const encontrarTodos = async () => {
  return await database.sequelize.query(`SELECT * FROM PRODUCTOS`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const encontrarPorId = async (id) => {
  return await database.sequelize.query(
    `SELECT * FROM PRODUCTOS WHERE ID = ${id};`,
    {
      type: database.sequelize.QueryTypes.SELECT,
    }
  );
};

const encontrarPorIds = async (idsProductos) => {
  return await database.sequelize.query(
    `SELECT * FROM PRODUCTOS WHERE ID IN (${idsProductos});`,
    {
      type: database.sequelize.QueryTypes.SELECT,
    }
  );
};

const actualizar = async (id, body) => {
  return await database.sequelize.query(
    `UPDATE PRODUCTOS SET DESCRIPCION = "${body.descripcion}", PRECIO = ${body.precio} WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const eliminar = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM PRODUCTOS WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    crearProducto,
    encontrarTodos,
    encontrarPorId,
    encontrarPorIds,
    actualizar,
    eliminar
};