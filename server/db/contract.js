const Sequelize = require("sequelize");
const db = require("./db");

const Contract = db.define("contract", {
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    guestCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            max: 100,
        },
    },
    package: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    layout: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Contract;
