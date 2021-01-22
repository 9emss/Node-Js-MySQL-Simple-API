const dbCon = require("../config/db-connection");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbCon.DBNAME, dbCon.USER, dbCon.PASS, {
    host: dbCon.HOST,
    dialect: dbCon.dialect,
    operatorAliases: false,
    pool: {
        max: dbCon.pool.max,
        min: dbCon.pool.min,
        acquire: dbCon.pool.min,
        idle: dbCon.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.model")(sequelize, Sequelize);

module.exports = db;
