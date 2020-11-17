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

const findByEmail = async (body) => {
  return await database.sequelize.query(`SELECT * FROM COMPANIES WHERE EMAIL = "${body.email}";`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findById = async (id) => {
  return await database.sequelize.query(`SELECT * FROM COMPANIES WHERE ID = "${id}";`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const add = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO COMPANIES (name, address, email, phone, cityId) 
     VALUES ("${body.name}","${body.address}", "${body.email}", "${body.phone}", "${body.cityId}");`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const updateCompany = async (body, id) => {
  return await database.sequelize.query(
    `UPDATE COMPANIES SET NAME="${body.name}", ADDRESS="${body.address}",
    EMAIL="${body.email}", PHONE="${body.phone}", CITYID=${body.cityId} WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const deleteCompany = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM COMPANIES WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    findAll,
    findByEmail,
    findById,
    add,
    updateCompany,
    deleteCompany
};