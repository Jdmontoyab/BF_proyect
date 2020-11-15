const router = require("express").Router();

const access = require("../database/access/companies");

const { validateToken } = require("../middlewares/contacts");

router.get("/", validateToken, async (req, res) => {
    try {
      const companies = await access.findAll();
      res.status(200).json(companies);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

module.exports = router;