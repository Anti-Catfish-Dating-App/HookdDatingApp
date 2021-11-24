const Sequelize = require("sequelize")
const db = require("../db")

const Users = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // validate: {
    //   is: /^[0-9a-f]{64}$/i,
    // },
  },
  gender: {
    type: Sequelize.STRING,
    // type: Sequelize.ENUM({
    //   values: ["Male", "Female", "Non-Binary"],
    // }),
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18,
      max: 99,
    },
  },
  bio: {
    type: Sequelize.STRING,
  },
  baselinePhoto: {
    type: Sequelize.STRING,
  },
  lastTimeVerified: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Users
