const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('user', {
    firstName : {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    lastName : {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    email : {
        type: Sequelize.STRING,
        allowNull: false, 
        validate:{
            isEmail: true,
            notEmpty: true
        }
    }, 
    dateOfInterest : {
        type: Sequelize.DATE,
        allowNull: true
    }, 
    isAdmin : {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    passWord : {
        type : Sequelize.STRING,
        defaultValue : 'readytoeat!'
    }
    
})

module.exports = User
