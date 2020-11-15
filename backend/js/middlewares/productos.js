const validarPeticion = (req, res, next) => {
    console.log('validar peticion');
    const { descripcion, precio } = req.body;
    if(descripcion && precio){
        if (typeof(descripcion) === "string" && typeof(precio) === "number"){
            next();
        } else {
            res.status(400).json('Datos Inválidos');
        }
    } else {
        res.status(400).json('Datos Inválidos o Incompletos');
    };
};

module.exports = {
    validarPeticion
}