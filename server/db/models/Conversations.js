const Sequelize = require('sequelize');
const db = require('../db');

const Conversations = db.define('conversation', {
  //I don't think any extra fields needed for a through table.
})

module.exports = Conversations
