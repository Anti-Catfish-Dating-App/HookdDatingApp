const Sequelize = require("sequelize")
const db = require("../db")

const NotMatches = db.define("notmatch", {
  swipingUser: {
    type: Sequelize.INTEGER,
  },
  swipedOnUser: {
    type: Sequelize.INTEGER,
  },
})

module.exports = NotMatches
