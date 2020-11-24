const jwt = require("jsonwebtoken");

const SECRET = "53c73_70k3n1d";

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Access Denied 1" });
      
        await jwt.verify(token, SECRET, (error, data) => {
            if (error) return res.status(401).json({ error: "Access Denied 2" });
            req.body.id = data.id;
            req.body.roleId = data.roleId;
            next();
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    validateToken
};