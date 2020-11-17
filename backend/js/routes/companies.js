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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let company = await access.findById(id);

    return res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/create', async (req, res)=>{
  try {
    const company = await access.findByEmail(req.body);
    if (company.length) {
      return res.status(409).json({ error: "Company already exists!" });
    }
    await access.add(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.updateCompany(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.deleteCompany(id);

    res.json({ message: "Delete Company Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;