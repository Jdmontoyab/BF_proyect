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

const findRegionByDescription = async (body) => {
  return await database.sequelize.query(`SELECT * FROM REGIONS WHERE DESCRIPTION="${body.description}";`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const addRegion = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO REGIONS (description) VALUES ("${body.description}");`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const updateRegion = async (body, id) => {
  return await database.sequelize.query(
    `UPDATE REGIONS SET DESCRIPTION = "${body.description}" WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const deleteRegion = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM REGIONS WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

const findCountriesByRegionId = async (regionId) => {
    return await database.sequelize.query(`SELECT * FROM COUNTRIES WHERE REGIONID=${regionId};`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findCountryByDescription = async (body) => {
  return await database.sequelize.query(`SELECT * FROM COUNTRIES WHERE DESCRIPTION="${body.description}";`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const addCountry = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO COUNTRIES (description, regionId) VALUES ("${body.description}", ${body.regionId});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const updateCountry = async (body, id) => {
  return await database.sequelize.query(
    `UPDATE COUNTRIES SET DESCRIPTION = "${body.description}", REGIONID=${body.regionId} WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const deleteCountry = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM COUNTRIES WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

const findCitiesByCountryId = async (countryId) => {
  return await database.sequelize.query(`SELECT * FROM CITIES WHERE COUNTRYID=${countryId};`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findCityByDescription = async (body) => {
  return await database.sequelize.query(`SELECT * FROM CITIES WHERE DESCRIPTION="${body.description}";`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const addCity = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO CITIES (description, countryId) VALUES ("${body.description}", ${body.countryId});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const updateCity = async (body, id) => {
  return await database.sequelize.query(
    `UPDATE CITIES SET DESCRIPTION = "${body.description}", COUNTRYID=${body.countryId} WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const deleteCity = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM CITIES WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    findAll,
    findRegions,
    findRegionById,
    findRegionByDescription,
    addRegion,
    updateRegion,
    deleteRegion,
    findCountriesByRegionId,
    findCountryByDescription,
    addCountry,
    updateCountry,
    deleteCountry,
    findCitiesByCountryId,
    findCityByDescription,
    addCity,
    updateCity,
    deleteCity
};