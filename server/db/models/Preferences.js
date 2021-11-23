const Sequelize = require('sequelize');
const db = require('../db');

const Preferences = db.define('preference', {
  genederPreference: {
    type: Sequelize.ENUM ({
      values: ['Male', 'Female', 'Male/Female', 'Non-Binary', 'Any']
    }),
    validate: {
      notNull: true
    }
  },
  agePreference: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18,
      max: 99,
      notNull: true
    }
  }
})

module.exports = Preferences
