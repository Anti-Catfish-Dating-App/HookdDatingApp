const router = require("express").Router()

const {
  models: { User, Matches },
} = require("../db")
const Conversations = require("../db/models/Conversations")
const { requireToken } = require("./middleware")

router.get("/", requireToken, async (req, res, next) => {
  try {
    const data = await matchReducer(req.user.id);
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
        res.status(222).send("ITS A MATCH")
      } else {
        res.sendStatus(200)
      }
    } else if (direction === "left") {
      await req.user.addSwiped(swipedUser, {
        through: {
          isRightSwipe: false,
        },
      })
      res.sendStatus(200)
    }

  } catch (error) {
    next(error)
  }
})

module.exports = router


//Match reducer function (to find all matches for logged in user):
const matchReducer = async (loggedInUserId) => {
  const userMatches = await Matches.findAll({
    where: {
      SwipedId: loggedInUserId,
      isRightSwipe: true,
    },
  })
  const userSwipedMatchesIds = userMatches.map((x) => x.userId)

  const otherUserSwipedMatchesIds = await Matches.findAll({
    where: {
      userId: loggedInUserId,
      isRightSwipe: true,
    },
  })
  const swipedUserMatches = otherUserSwipedMatchesIds.map((x) => x.SwipedId)

  return userSwipedMatchesIds.filter((item) =>
  swipedUserMatches.includes(item))
}
