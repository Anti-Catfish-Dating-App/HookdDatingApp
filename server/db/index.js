const db = require("./db")

//Import models
// const {
//   Conversations,
//   Images,
//   Matches,
//   Messages,
//   NotMatches,
//   Preferences,
//   Reviews,
//   User,
// } = require("./models/")

const Conversations = require("./models/Conversations")
const Images = require("./models/Images")
const Matches = require("./models/Matches")
const Messages = require("./models/Messages")
const NotMatches = require("./models/NotMatches")
const Preferences = require("./models/Preferences")
const Reviews = require("./models/Reviews")
const User = require("./models/User")

//Associations
User.belongsToMany(User, { as: "RightSwiped", through: Matches })
User.belongsToMany(User, { as: "LeftSwiped", through: NotMatches })

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
    User,
  },
}
