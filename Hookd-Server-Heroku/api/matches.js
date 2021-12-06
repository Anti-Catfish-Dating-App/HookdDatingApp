const router = require("express").Router()

const {
  models: { User, Matches },
} = require("../db")
const Conversations = require("../db/models/Conversations")
const { requireToken } = require("./middleware")
const matchReducer = require("./findAllMatches")

router.get("/", requireToken, async (req, res, next) => {
  try {
    const data = await matchReducer(req.user.id)
    const matchData = await data.map(async (x) => await User.findByPk(x))
    const matchedUsers = await Promise.all(matchData)

    res.send(matchedUsers)
  } catch (error) {
    next(error)
  }
})

router.post("/", requireToken, async (req, res, next) => {
  try {
    const swipedUser = await User.findByPk(req.body.id)
    const direction = req.body.direction
    await req.user.increment('swipeCounter', { by: 1})

    if(req.user.swipeCounter % 25 === 0){
      await req.user.update({
        isVerified: false
      })
    }

    if (direction === "right") {
      await req.user.addSwiped(swipedUser.id, {
        through: {
          isRightSwipe: true,
        },
      })


      //user doesn't hae access to swipedId
      const matchBool = await Matches.findOne({
        where: {
          userId: swipedUser.id,
          SwipedId: req.user.id,
          isRightSwipe: true,
        },
      })

      if (matchBool) {
        await Conversations.create({
          user1: swipedUser.id,
          user2: req.user.id,
        })
        res.status(222).send(req.user)
      } else {
        res.status(200).send(req.user)
      }
    } else if (direction === "left") {
      await req.user.addSwiped(swipedUser, {
        through: {
          isRightSwipe: false,
        },
      })
      res.status(200).send(req.user)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
