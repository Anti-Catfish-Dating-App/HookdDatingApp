const Sequelize = require('sequelize');
const db = require('../db');

const Images = db.define('image', {
  imageUrl: {
    type: Sequelize.STRING,
    validation: {
      isUrl: true,
    }
  }
})

module.exports = Images
