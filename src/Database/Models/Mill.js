const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const User = require("./User");

const Mill = sequelize.define("mill", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Mill.belongsTo(User)

const init = async () => {
    await Mill.sync();
};

init();

module.exports = Mill;