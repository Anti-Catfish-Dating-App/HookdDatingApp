const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  },
  reviewText: {
    type: Sequelize.STRING
  },
  reviewer: {
    type: Sequelize.INTEGER
  },
  reviewedUser: {
    type: Sequelize.INTEGER
  }
})

module.exports = Reviews
