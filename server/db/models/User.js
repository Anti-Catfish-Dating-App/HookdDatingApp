const Sequelize = require('sequelize');
const db = require('../db');

const Users = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notNull: true,
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      is: /^[0-9a-f]{64}$/i,
      notNull: true
    }
  },
  gender: {
    type: Sequelize.ENUM({
      values: ['Male', 'Female', 'Non-Binary']
    }),
    validate: {
      notNull: true
    }
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true,
      min: 18,
      max: 99
    }
  },
  bio: {
    type: Sequelize.TEXT,
  },
  baselinePhoto: {
    type: Sequelize.STRING
  },
  lastTimeVerified: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    }
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Users
