const Sequelize = require("sequelize")
const db = require("../db")

const Matches = db.define("match", {
  swipingUser: {
    type: Sequelize.INTEGER,
  },
  swipedOnUser: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Matches
