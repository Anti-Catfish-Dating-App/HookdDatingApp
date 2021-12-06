const Sequelize = require("sequelize")
const db = require("../db")

const Messages = db.define("message", {
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = Messages
