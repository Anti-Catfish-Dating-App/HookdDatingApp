const router = require("express").Router()
const {
  models: { Conversations, Messages, User },
} = require("../db")
const { Op } = require("sequelize")

// post a message
router.post("/", async (req, res, next) => {
  try {
    const token = req.headers
    const { conversationId, message } = req.body
    const user = await User.findOne({
      where: {
        token,
      },
    })
    const conversation = await Conversations.findOne({
      where: {
        id: conversationId,
      },
    })
    if (!user || !conversation) {
      return res.status(401).send("Unauthorized")
    }
    const newMessage = await Messages.create({
      message,
      userId: user.id,
      recieverId: conversation.recieverId,
      conversationId: conversation.id,
    })
    res.status(201).send(newMessage)
  } catch (error) {
    next(error)
  }
})

// get all messages
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers
    const user = await User.findOne({
      where: {
        token,
      },
    })
    if (!user) {
      return res.status(401).send("Unauthorized")
    }
    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          {
            userId: user.id,
          },
          {
            recieverId: user.id,
          },
        ],
      },
    })
    res.status(200).send(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router
