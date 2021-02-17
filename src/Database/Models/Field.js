const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Farm = require("./Farm");

const Field = sequelize.define("field", {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Field.belongsTo(Farm)

const init = async () => {
    await Field.sync();
};

init();

module.exports = Field;