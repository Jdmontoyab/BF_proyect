const router = require("express").Router();

const access = require("../database/access/rcc");
const { validateToken } = require("../middlewares/contacts");

// REGIONS //

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

router.post('/regions/create', async (req, res)=>{
  try {
    const region = await access.findRegionByDescription(req.body);
    console.log(region);
    if (region.length) {
      return res.status(409).json({ error: "Region already exists!" });
    }
    await access.addRegion(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/regions/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.updateRegion(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/regions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.deleteRegion(id);

    res.json({ message: "Delete Region Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// COUNTRIES //

router.get("/countries/:regionid", async (req, res) => {
  try {
    const { regionid } = req.params;

    let countries = await access.findCountriesByRegionId(regionid);
    return res.json(countries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/countries/create', async (req, res)=>{
  try {
    const country = await access.findCountryByDescription(req.body);
    if (country.length) {
      return res.status(409).json({ error: "Country already exists!" });
    }
    await access.addCountry(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.updateCountry(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.deleteCountry(id);

    res.json({ message: "Delete Country Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CITIES //

router.get("/", async (req, res) => {
  try {
    let cities = await access.findAll();
    res.status(200).json(cities);
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

router.post('/cities/create', async (req, res)=>{
  try {
    const city = await access.findCityByDescription(req.body);
    if (city.length) {
      return res.status(409).json({ error: "City already exists!" });
    }
    await access.addCity(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/cities/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.updateCity(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/cities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.deleteCity(id);

    res.json({ message: "Delete Country Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;