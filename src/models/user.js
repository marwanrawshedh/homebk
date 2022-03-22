"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Users = (sequelize, DataTypes) => {
  const userModule = sequelize.define("user", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
    },
    role: {
      type: DataTypes.ENUM("owner", "admin"),
      allowNull: false,
      defaultValue: "owner",
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          owner: ["read", "create" ],
          admin: ["read",  "update"],
        };
        return acl[this.role];
      },
    },
  });

  userModule.authBasic = async function (username, password) {
    try {
      const user = await userModule.findOne({ where: { username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        user.token = jwt.sign({ username: user.username }, process.env.SECRET);
        return user;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  userModule.authToken = async function (token) {
    try {
      const paresdToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({ where: { username: paresdToken.username } });
      if (user) {
        return user;
      }
      throw new Error("User not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return userModule;
};

module.exports = Users;
