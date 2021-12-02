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
        [Op.or]: [
          { [Op.and]: [{ user1: id }, { user2: recievingId }] },
          { [Op.and]: [{ user1: recievingId }, { user2: id }] },
        ],
      },
    })
    const messages = await Messages.findAll({
      where: {
        conversationId: conversations.id,
        // { userId: conversations.user1 },
        // { userId: conversations.user2 },
      },
    })
    console.log(messages)
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers)
    const { id } = user
    const { receiverId, message } = req.body
    // const recievingId = parseInt(recieverId)
    console.log(id)
    const conversations = await Conversations.findOne({
      where: {
        [Op.and]: [
          {
            user1: id,
          },
          {
            user2: receiverId,
          },
        ],
      },
    })
    const messages = await Messages.create({
      conversationId: conversations.id,
      userId: id,
      message,
    })
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router
