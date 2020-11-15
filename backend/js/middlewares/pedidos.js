const validarPedido = (req, res, next) => {
    const { id_usuario, id_met_pago } = req.body;
    for (const item of req.body.productos) {
        if (item.id && item.cantidad) {
            if (typeof(item.id) === "number" && typeof(item.cantidad) === "number") {
                if (item.cantidad <= 0) {
                    res.status(404).json('Cantidad Inválida');
                }
            } else {
                res.status(404).json('Datos Erroneos');
            }
        } else {
            res.status(404).json('Datos Erroneos o Incompletos');
        }
    }
    
    if(id_usuario && id_met_pago) {
        if (typeof(id_usuario) === "number" && typeof(id_met_pago) === "number") {
            next();
        } else {
            res.status(404).json('Datos Erroneos');
        }
    } else {
        res.status(404).json('Datos Erroneos o Incompletos');
    };
};

module.exports = {
    validarPedido
}