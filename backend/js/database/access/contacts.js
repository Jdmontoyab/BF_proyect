const database = require("../index");

const findDetailsContacts = `SELECT CONTACTS.ID AS contactsId,
CONTACTS.FULL_NAME AS full_name, CONTACTS.EMAIL AS email, CONTACTS.POSITION AS position, CONTACTS.FAV_CHANNEL AS fav_channel, CONTACTS.INTEREST AS interest,
CITIES.ID AS cityId, CITIES.DESCRIPTION AS city,
COMPANIES.ID AS companyId, COMPANIES.NAME AS company
FROM CONTACTS CONTACTS
INNER JOIN CITIES CITIES
ON CONTACTS.CITYID = CITIES.ID
INNER JOIN COMPANIES COMPANIES
ON CONTACTS.COMPANYID = COMPANIES.ID`;

const findAll = async () => {
  return await database.sequelize.query(findDetailsContacts, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findByEmail = async (body) => {
  return await database.sequelize.query(`SELECT * FROM CONTACTS WHERE EMAIL = "${body.email}";`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findContactById = async (id) => {
  return await database.sequelize.query(`${findDetailsContacts} WHERE CONTACTS.id = ${id};`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const add = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO CONTACTS (full_name, email, cityId, companyId, position, fav_channel, interest) 
     VALUES ("${body.full_name}","${body.email}","${body.cityId}","${body.companyId}", "${body.position}", "${body.fav_channel}", ${body.interest});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const updateContact = async (body, id) => {
  return await database.sequelize.query(
    `UPDATE CONTACTS SET FULL_NAME = "${body.full_name}", EMAIL="${body.email}", CITYID=${body.cityId},
    COMPANYID=${body.companyId}, POSITION="${body.position}", FAV_CHANNEL="${body.fav_channel}",
    INTEREST="${body.interest}" WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const deleteContact = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM CONTACTS WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
  findAll,
  findByEmail,
  findContactById,
  updateContact,
  deleteContact,
  add
};