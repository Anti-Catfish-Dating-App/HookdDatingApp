const db = require('./db');
const Sequelize = require('sequelize');

//Import models
const { Conversations, Images, Matches, Messages, NotMatches, Preferences, Reviews, User } = require('./models');


//Associations
User.belongsToMany(User, { as: 'swipedOnUser', through: Matches})
User.belongsToMany(User, { as: 'swiperOnUser', through: NotMatches})

module.exports = {
  db,
  models: {
    Conversations,
    Images,
    Matches,
    Messages,
    NotMatches,
    Preferences,
    Reviews,
    User
  }
}
