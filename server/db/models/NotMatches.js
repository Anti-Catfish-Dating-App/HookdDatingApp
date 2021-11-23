const Sequelize = require('sequelize');
const db = require('../db');

const NotMatches = db.define('notmatch', {
  swipingUser: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  swipedOnUser: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  }
})

module.exports = NotMatches
