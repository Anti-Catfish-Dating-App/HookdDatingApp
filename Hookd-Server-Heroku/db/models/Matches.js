const Sequelize = require("sequelize")
const db = require("../db")

const Matches = db.define("match", {
  isRightSwipe: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Matches
