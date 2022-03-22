'use strict'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const Homes = (sequelize, DataTypes) => {
    const homeModule = sequelize.define('home', {
        ownerId:{ type: DataTypes.STRING, allowNull: false },
        flore: { type: DataTypes.STRING, allowNull: false },
        adress: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('pending', 'rejected',"approved"),defaultValue: "pending" },
        ownernumber: { type: DataTypes.INTEGER, allowNull: false },
        token: {
            type: DataTypes.VIRTUAL,
        },
    })
    return homeModule
}

module.exports = Homes
