const router = require("express").Router();

const { validarToken, validarPermisos } = require("../middlewares/usuarios");

const { validarPedido } = require("../middlewares/pedidos");

const accesoPedidos = require("../basededatos/acceso/pedidos");
const accesoProductos = require("../basededatos/acceso/productos");
const accesoDescPedido = require("../basededatos/acceso/desc_pedidos");

const ADMIN_IDROLE = 2;

router.post("/crear", validarPedido, validarToken, async (req, res) => {
    try {
        const validarProductos = await descProductosPedido(req.body.productos);
  
        if (validarProductos && validarProductos.error)
            return res.status(400).json({ error: 400, detailError: validarProductos.error });
  
        let guardarPedido = await accesoPedidos.crear(req.body);
  
        await crearDescPedido(guardarPedido[0], req.body.productos);
  
        res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

const descProductosPedido = async (productos) => {
    const idsProductosPedido = productos.map((item) => item.id);
  
    const idsProductosRestaurante = (await accesoProductos.encontrarPorIds(idsProductosPedido)).map((item) => item.id);

    if (idsProductosPedido.length != idsProductosRestaurante.length) {
        let detallesError = idsProductosPedido.filter((item) => !idsProductosRestaurante.includes(item)).map((item) => {
            return {
                id: item,
                message: "El producto no existe",
            };
        });
        return { error: detallesError };
    }
};

const crearDescPedido = async (id_pedido, productos) => {
    for (const item of productos) {
      const descPedido = {
        id_pedido,
        id_producto: item.id,
        cantidad: item.cantidad,
      };
      await accesoDescPedido.crear(descPedido);
    }
};

router.get("/", validarToken, async (req, res) => {
    try {
      const { id_usuario, roleId } = req.body;

      let pedidos = null;
  
      if (roleId === ADMIN_IDROLE) {
        pedidos = await accesoPedidos.encontrarTodos();
      } else {
        pedidos = await accesoPedidos.encontrarTodosPorId(id_usuario);
      }
  
      return res.json(pedidos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/:id", validarToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { roleId, id_usuario } = req.body;
  
      let pedido = null;
  
      if (roleId === ADMIN_IDROLE) {
        pedido = await accesoPedidos.encontrarPorId(id);
      } else {
        pedido = await accesoPedidos.encontrarPorIdYidUsuario(id, id_usuario);
      }
  
      return res.json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.put("/:id", validarToken, validarPermisos, async (req, res) => {
    try {
      const { id } = req.params;
      const { id_estado } = req.body;
  
      if (!id_estado) {
          return res.status(400).json({ error: "El id del estado es requerido" });
      }
        
      let pedido = await accesoPedidos.encontrarPorId(id);

      if (!pedido.length) {
          return res.status(404).json({ error: "El pedido no existe" });
      }
        
      await accesoPedidos.actualizarEstado(id, id_estado);
  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", validarToken, validarPermisos, async (req, res) => {
    try {
      const { id } = req.params;
  
      let pedido = await accesoPedidos.encontrarPorId(id);
      if (!pedido.length)
        return res.status(404).json({ error: "El pedido no existe" });
  
      await accesoDescPedido.eliminar(id);
  
      await accesoPedidos.eliminar(id);
  
      res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;