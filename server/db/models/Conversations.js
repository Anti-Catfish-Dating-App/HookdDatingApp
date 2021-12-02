const Sequelize = require("sequelize")
const db = require("../db")

const Conversations = db.define("conversations", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
})

module.exports = Conversations
