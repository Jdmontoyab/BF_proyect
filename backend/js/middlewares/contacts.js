const jwt = require("jsonwebtoken");

const SECRET = "53c73_70k3n1d";
const ADMIN_IDROLE = 1;

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) return res.status(401).json({ error: "Access Denied 1" });
      
        await jwt.verify(token, SECRET, (error, data) => {
            console.log(token);
            console.log(SECRET);
            if (error) return res.status(401).json({ error: "Access Denied 2" });
            req.body.id = data.id;
            req.body.roleId = data.roleId;
            next();
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validatePermissions = (req, res, next) => {
    try {
        if (req.body.roleId !== ADMIN_IDROLE){
            return res.status(403).json({ error: "Access Denied 3" }); 
        }
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validateAddContact = (req, res, next) => {
    const { full_name, email, cityId, companyId, password, roleId } = req.body;
    if(full_name && email && cityId && companyId && password && roleId) {
        if (typeof(full_name) === "string"
        && typeof(email) === "string"
        && typeof(cityId) === "number"
        && typeof(companyId) === "number"
        && typeof(password) === "string"
        && typeof(roleId) === "number"){
            if (roleId !==1 && roleId !==2){
                return res.status(400).json('El rol de usuario debe ser 1 para Clientes o 2 para Administrador');
            }
            if (password.length < 6) {
                return res.status(400).json('La contraseña debe tener al menos 6 caracteres');
            }
            next();
        } else {
            res.status(400).json('Datos Erroneos');
        }
    } else {
        res.status(400).json('Datos Erroneos o Incompletos');
    };
};

module.exports = {
    validateToken,
    validatePermissions,
    validateAddContact
};