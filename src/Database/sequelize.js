const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
    ssl: {
        rejectUnauthorized: false,
    },
    },
});

sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize, Op;