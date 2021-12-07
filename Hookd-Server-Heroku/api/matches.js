const router = require("express").Router()

const {
  models: { User, Matches, Reviews },
} = require("../db")
const Conversations = require("../db/models/Conversations")
const Sequelize = require("sequelize")
const { requireToken } = require("./middleware")
const matchReducer = require("./findAllMatches")

router.get("/", requireToken, async (req, res, next) => {
  try {
    const data = await matchReducer(req.user.id)
    const matchData = await data.map(async (x) => await User.findOne({
      where: {
        id: x
      },
      attributes: ["id", "name", "profilePicture",
        [Sequelize.fn("avg", Sequelize.col('reviews.rating')), "avgRating"]
      ],
      include: [
        {
          model: Reviews,
          as: 'reviews',
          attributes:['userId']
        }
      ],
      raw: true,
      group: ['userId', 'user.id']
    }))
    const awaitedMatchData = await Promise.all(matchData)

    const matchedUsers = awaitedMatchData.map((x) => {
      x.avgRating = parseFloat(x.avgRating);
      return x;
    })

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
