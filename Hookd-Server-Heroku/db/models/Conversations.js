const Sequelize = require("sequelize")
const db = require("../db")

const Conversations = db.define("conversations", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user1: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user2: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = Conversations
