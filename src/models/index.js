'use strict'
const users = require('./user')
const homes = require('./home')
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)

const user = users(sequelize, DataTypes)
const home = homes(sequelize, DataTypes)


module.exports = {
  user ,
  home ,
  db : sequelize 
}