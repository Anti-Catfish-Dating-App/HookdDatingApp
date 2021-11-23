const Sequelize = require('sequelize');
const db = require('../db');

const Matches = db.define('match', {
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

module.exports = Matches
