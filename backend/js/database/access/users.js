const database = require("../index");

const findByUser = async (body) => {
    return await database.sequelize.query(
        `SELECT * FROM USERS WHERE USERNAME = "${body.username}";`,
        { type: database.sequelize.QueryTypes.SELECT });
};

const findByEmail = async (body) => {
    console.log('entro');
    return await database.sequelize.query(`SELECT * FROM USERS WHERE EMAIL = "${body.email}";`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findAll = async () => {
    return await database.sequelize.query(`SELECT * FROM USERS;`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findById = async (id) => {
    return await database.sequelize.query(`SELECT * FROM USERS WHERE ID = "${id}";`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
  };

const add = async (body) => {
    return await database.sequelize.query(
      `INSERT INTO USERS (username, name, last_name, email, password, roleId) 
       VALUES ("${body.username}","${body.name}","${body.last_name}","${body.email}", "${body.password}", "${body.roleId}");`,
      { type: database.sequelize.QueryTypes.INSERT }
    );
};

const updateUser = async (body, id) => {
    return await database.sequelize.query(
      `UPDATE USERS SET USERNAME = "${body.username}", NAME="${body.name}", LAST_NAME="${body.last_name}",
      EMAIL="${body.email}", PASSWORD="${body.password}", ROLEID=${body.roleId} WHERE ID = ${id};`,
      { type: database.sequelize.QueryTypes.UPDATE }
    );
};

const deleteUser = async (id) => {
    return await database.sequelize.query(
      `DELETE FROM USERS WHERE ID = ${id};`,
      { type: database.sequelize.QueryTypes.DELETE }
    );
  };

module.exports = {
    findByUser,
    findByEmail,
    findAll,
    findById,
    add,
    updateUser,
    deleteUser
};
