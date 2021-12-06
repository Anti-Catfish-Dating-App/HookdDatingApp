const Sequelize = require("sequelize")
const db = require("../db")

const Preferences = db.define("preference", {
  genederPreference: {
    type: Sequelize.ENUM({
      values: ["Male", "Female", "Male/Female", "Non-Binary", "Any"],
    }),
  },
  agePreference: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18,
      max: 99,
    },
  },
})

module.exports = Preferences
