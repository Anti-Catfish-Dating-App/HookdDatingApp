const router = require("express").Router()
const {
  models: { Conversations, Messages, User },
} = require("../db")
const { Op } = require("sequelize")

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers)

    const { id } = user
    const conversations = await Conversations.findAll({
      where: {
        [Op.or]: [
          {
            user1: id,
          },
          {
            user2: id,
          },
        ],
      },
    })
    const messages = await Messages.findAll({
      where: {
        conversationId: conversations.map((conversation) => conversation.id),
      },
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router
