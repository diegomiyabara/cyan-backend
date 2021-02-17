const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Harvest = require("./Harvest");

const Farm = sequelize.define("farm", {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Farm.belongsTo(Harvest)

const init = async () => {
    await Farm.sync();
};

init();

module.exports = Farm;