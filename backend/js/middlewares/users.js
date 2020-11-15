const jwt = require("jsonwebtoken");

const SECRET = "53c73_70k3n1d";
const ADMIN_IDROLE = 1;

const validateLogin = (req, res, next) => {
    try {
        const { username, pass } = req.body;
        if (!username || !pass)
            return res.status(400).json({ error: "Bad credentials." });
            next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    validateLogin
};