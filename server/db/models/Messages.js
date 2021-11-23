const Sequelize = require("sequelize")
const db = require("../db")

const Messages = db.define("message", {
  messageBody: {
    type: Sequelize.TEXT,
  },
  images: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.DATE,
  },
})

module.exports = Messages
