const router = require("express").Router();

const { validateToken, validatePermissions, validateAddContact } = require("../middlewares/contacts");

const jwt = require("jsonwebtoken");
const access = require("../database/access/contacts");

//const SECRET = "70k3n1d";

router.get("/", validateToken, async (req, res) => {
  try {
    const contacts = await access.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let contact = await access.findById(id);

    return res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/add', async (req, res)=>{
  try {
    console.log("Hola");
    console.log(req.body);
    const contact = await access.findByEmail(req.body);
    if (contact.length) {
      return res.status(409).json({ error: "Contact already exists!" });
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
      
    await access.updateContact(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.deleteContact(id);

    res.json({ message: "Delete Contact Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;