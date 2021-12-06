const db = require("./db")


const Conversations = require("./models/Conversations")
// const Images = require("./models/Images")
const Matches = require("./models/Matches")
const Messages = require("./models/Messages")
// const Preferences = require("./models/Preferences")
const Reviews = require("./models/Reviews")
const User = require("./models/User")

//Associations
User.belongsToMany(User, { as: "Swiped", through: Matches })
User.belongsToMany(User, { as: "reviewedUser", through: Reviews})

User.hasMany(Conversations)
Conversations.belongsTo(User, {
  foriegnKey: "conversationId",
})



Messages.belongsTo(Conversations)
Messages.belongsTo(User)


module.exports = {
  db,
  models: {
    Conversations,
    Matches,
    Messages,
    Reviews,
    User,
  },
}
