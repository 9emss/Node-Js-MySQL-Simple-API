module.exports = {
  HOST: "localhost",
  USER: "gemss",
  PASS: "N4$1Sambel",
  DBNAME: "gemssapi",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
