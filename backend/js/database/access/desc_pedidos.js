const database = require("../index");

const crear = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO DESC_PEDIDOS (id_pedido, id_producto, cantidad) VALUES (${body.id_pedido}, ${body.id_producto}, ${body.cantidad});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const eliminar = async (id_pedido) => {
    return await database.sequelize.query(
      `DELETE FROM DESC_PEDIDOS WHERE ID_PEDIDO = ${id_pedido};`,
      { type: database.sequelize.QueryTypes.DELETE }
    );
};

module.exports = {
    crear,
    eliminar
};