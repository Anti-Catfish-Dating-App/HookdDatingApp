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
// const Images = require("./models/Images")
const Matches = require("./models/Matches")
const Messages = require("./models/Messages")
// const Preferences = require("./models/Preferences")
// const Reviews = require("./models/Reviews")
const User = require("./models/User")

//Associations
User.belongsToMany(User, { as: "Swiped", through: Matches })

User.belongsToMany(Conversations, {
  foriegnKey: "userId",
  through: Messages,
})
Conversations.belongsToMany(User, {
  foriegnKey: "conversationId",
  through: Messages,
})

Messages.belongsTo(Conversations)
Conversations.hasMany(Messages)

Messages.belongsTo(User)

module.exports = {
  db,
  models: {
    Conversations,
    // Images,
    Matches,
    Messages,
    // Preferences,
    // Reviews,
    User,
  },
}
