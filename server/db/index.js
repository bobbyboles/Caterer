const db = require("./db");
const Contract = require("./contract");
const User = require("./user");

User.hasMany(Contract);
Contract.belongsTo(User);

module.exports = {
    db,
    User,
    Contract,
};
