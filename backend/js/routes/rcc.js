const router = require("express").Router();

const access = require("../database/access/rcc");
const { validateToken } = require("../middlewares/contacts");

router.get("/", async (req, res) => {
  try {
    let cities = await access.findAll();
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/regions", validateToken, async (req, res) => {
  try {
    let regions = await access.findRegions();
    return res.json(regions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/regions/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      let region = await access.findRegionById(id);
  
      return res.json(region);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/countries/:regionid", async (req, res) => {
  try {
    const { regionid } = req.params;

    let countries = await access.findCountriesByRegionId(regionid);
    return res.json(countries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/cities/:countryid", async (req, res) => {
  try {
    const { countryid } = req.params;

    let cities = await access.findCitiesByCountryId(countryid);
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;