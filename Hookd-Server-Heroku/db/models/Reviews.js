const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('review', {
  rating: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
      min: 0,
      max: 5,
    }
  },
  reviewText: {
    type: Sequelize.STRING
  },
})

module.exports = Reviews
