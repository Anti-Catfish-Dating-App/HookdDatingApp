const router = require("express").Router()
const {
  models: { Conversations, Messages, User },
} = require("../db")
const { Op } = require("sequelize")

router.get("/:recieverId", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers)
    const recievingId = parseInt(req.params.recieverId)
    const { id } = user
    const conversations = await Conversations.findOne({
      where: {
        [Op.and]: [
          {
            user1: id,
          },
          {
            user2: recievingId,
          },
        ],
      },
    })
    const messages = await Messages.findAll({
      where: {
        [Op.and]: [
          { conversationId: conversations.id },
          // { userId: conversations.user1 },
          // { userId: conversations.user2 },
        ],
      },
    })
    console.log(messages)
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router
