const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Mill = require("./Mill");

const Harvest = sequelize.define("harvest", {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Harvest.belongsTo(Mill)

const init = async () => {
    await Harvest.sync();
};

init();

module.exports = Harvest;