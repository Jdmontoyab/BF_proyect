const database = require("../index");

const findDetailsCompanies = `SELECT COMPANIES.ID AS companyId,
COMPANIES.NAME AS name, COMPANIES.ADDRESS AS address, COMPANIES.EMAIL AS email, COMPANIES.PHONE AS phone,
CITIES.ID AS cityId, CITIES.DESCRIPTION AS cityDesc
FROM COMPANIES COMPANIES
INNER JOIN CITIES CITIES
ON COMPANIES.CITYID = CITIES.ID`;

const findAll = async () => {
    return await database.sequelize.query(findDetailsCompanies, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

module.exports = {
    findAll
};