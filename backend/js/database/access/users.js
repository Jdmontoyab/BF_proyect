const database = require("../index");

const findByUser = async (body) => {
    return await database.sequelize.query(
        `SELECT * FROM USERS WHERE USERNAME = "${body.username}";`,
        { type: database.sequelize.QueryTypes.SELECT });
};

const findByEmail = async (body) => {
    return await database.sequelize.query(`SELECT * FROM USERS WHERE EMAIL = "${body.email}";`, {
      type: database.sequelize.QueryTypes.SELECT,
    });
};

const findAll = async () => {
    return await database.sequelize.query(`SELECT USERS.ID AS userId,
      USERS.USERNAME AS username, USERS.NAME AS name, USERS.LAST_NAME AS last_name, USERS.EMAIL AS email,
      ROLES.ID AS roleId, ROLES.DESCRIPTION AS role
      FROM USERS USERS
      INNER JOIN ROLES ROLES
      ON USERS.ROLEID = ROLES.ID`, {
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
