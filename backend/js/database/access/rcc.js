const database = require("../index");

const findDetailsCities = `SELECT CITIES.ID AS cityId,
CITIES.DESCRIPTION AS city,
COUNTRIES.ID AS countryId, COUNTRIES.DESCRIPTION AS countryDesc,
REGIONS.ID AS regionId, REGIONS.DESCRIPTION AS regionDesc
FROM CITIES CITIES
INNER JOIN COUNTRIES COUNTRIES
ON CITIES.COUNTRYID = COUNTRIES.ID
INNER JOIN REGIONS REGIONS
ON COUNTRIES.REGIONID = REGIONS.ID`;

const findAll = async () => {
    return await database.sequelize.query(findDetailsCities, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findRegions = async () => {
  return await database.sequelize.query(`SELECT * FROM REGIONS`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findRegionById = async (id) => {
    return await database.sequelize.query(`SELECT * FROM REGIONS WHERE ID=${id};`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findCountriesByRegionId = async (regionId) => {
    return await database.sequelize.query(`SELECT * FROM COUNTRIES WHERE REGIONID=${regionId};`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findCitiesByCountryId = async (countryId) => {
  return await database.sequelize.query(`SELECT distinct * FROM CITIES WHERE COUNTRYID=${countryId};`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

module.exports = {
    findAll,
    findRegions,
    findRegionById,
    findCountriesByRegionId,
    findCitiesByCountryId
};