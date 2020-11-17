const router = require("express").Router();

const { validateLogin, validatePassword } = require("../middlewares/users");
const { validateToken } = require("../middlewares/contacts");

const jwt = require("jsonwebtoken");
const access = require("../database/access/users");

const SECRET = "53c73_70k3n1d";

router.post("/login", validateLogin, async (req, res) => {
  try {
      const username = await access.findByUser(req.body);

      const { pass } = req.body;

      if (!username.length) {
        res.status(401).json({ error: "Username does not exist" });
      }
    
      if (username[0].password == pass) {
        const payload = {
          id: username[0].id,
          roleId: username[0].roleId,
          username: username[0].username
        }
        const token = jwt.sign(payload, SECRET);
        res.header("auth-token", token).json(token);
      } else {
        res.status(400).json({ error: "Bad credentials." });
      }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const users = await access.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let user = await access.findById(id);

    return res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/create', validatePassword, async (req, res)=>{
  try {
    const user = await access.findByEmail(req.body);
    if (user.length) {
      return res.status(409).json({ error: "User already exists!" });
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
      
    await access.updateUser(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.deleteUser(id);

    res.json({ message: "Delete User Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;