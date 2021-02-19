const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Farm = require("./Farm");

const Field = sequelize.define("field", {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    coordinates:{
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.FLOAT))
    }
});

Field.belongsTo(Farm)

const init = async () => {
    await Field.sync();
};

init();

module.exports = Field;