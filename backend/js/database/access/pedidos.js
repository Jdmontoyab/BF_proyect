const database = require("../index");

const crear = async (body) => {
    return await database.sequelize.query(
      `INSERT INTO PEDIDOS (id_usuario, id_estado, id_met_pago) VALUES (${body.id_usuario}, 1, ${body.id_met_pago});`,
      { type: database.sequelize.QueryTypes.INSERT }
    );
};

const encontrarDetallesPedidos = `SELECT PEDIDOS.ID AS id_pedidos,
ESTADOS.ID AS id_estado, ESTADOS.DESCRIPCION AS estado,
METODOS_PAGO.ID AS id_met_pago, METODOS_PAGO.DESCRIPCION AS metodo_de_pago,
DESC_PEDIDOS.CANTIDAD AS cantidad,
PRODUCTOS.ID AS id_producto, PRODUCTOS.DESCRIPCION AS producto, PRODUCTOS.PRECIO as precio,
USUARIOS.ID AS id_usuario, USUARIOS.NOMBRE_APELLIDO AS nombre_completo, USUARIOS.EMAIL AS email, USUARIOS.TELEFONO AS telefono, USUARIOS.DIRECCION AS direccion,
ROLES.ID AS roleId, ROLES.DESCRIPCION AS rol
FROM PEDIDOS PEDIDOS
INNER JOIN ESTADOS ESTADOS
ON PEDIDOS.id_estado = ESTADOS.id
INNER JOIN METODOS_PAGO METODOS_PAGO
ON PEDIDOS.id_met_pago = METODOS_PAGO.id
INNER JOIN DESC_PEDIDOS DESC_PEDIDOS
ON PEDIDOS.id = DESC_PEDIDOS.id_pedido
INNER JOIN PRODUCTOS PRODUCTOS
ON DESC_PEDIDOS.id_producto = PRODUCTOS.id
INNER JOIN USUARIOS USUARIOS
ON PEDIDOS.id_usuario = USUARIOS.id
INNER JOIN ROLES ROLES
ON USUARIOS.roleId = ROLES.id`;

const encontrarTodos = async () => {
    return await database.sequelize.query(encontrarDetallesPedidos, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const encontrarTodosPorId = async (id_usuario) => {
    return await database.sequelize.query(
      `${encontrarDetallesPedidos} WHERE USUARIOS.id = ${id_usuario};`,
      {
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
};

const encontrarPorId = async (id) => {
    return await database.sequelize.query(
      `${encontrarDetallesPedidos} WHERE PEDIDOS.id = ${id};`,
      {
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
};

const encontrarPorIdYidUsuario = async (id, id_usuario) => {
    return await database.sequelize.query(
      `${encontrarDetallesPedidos} WHERE PEDIDOS.id = ${id} AND  USUARIOS.id = ${id_usuario}`,
      {
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
};

const actualizarEstado = async (id, id_estado) => {
    return await database.sequelize.query(
      `UPDATE PEDIDOS SET ID_ESTADO = ${id_estado}  WHERE ID = ${id};`,
      { type: database.sequelize.QueryTypes.UPDATE }
    );
};

const eliminar = async (id) => {
    return await database.sequelize.query(
      `DELETE FROM PEDIDOS WHERE ID = ${id};`,
      { type: database.sequelize.QueryTypes.DELETE }
    );
};

module.exports = {
    crear,
    encontrarTodos,
    encontrarTodosPorId,
    encontrarPorId,
    encontrarPorIdYidUsuario,
    actualizarEstado,
    eliminar
};