const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db")


router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers);

    const userMatches = await Matches.findAll({
      where: {
        SwipedId: user.id,
        isRightSwipe: true
      }
    })
    const userSwipedMatchesIds = userMatches.map(x => x.userId)

    const otherUserSwipedMatchesIds = await Matches.findAll({
      where: {
        userId: user.id,
        isRightSwipe: true
      }
    })
    const swipedUserMatches = otherUserSwipedMatchesIds.map(x => x.SwipedId);

    const data = userSwipedMatchesIds.filter(item => swipedUserMatches.includes(item))

    const matchData = await data.map(async x => await User.findByPk(x))
    const matchedUsers = await Promise.all(matchData)


    res.send(matchedUsers);
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers);
    const direction = req.body.direction
    const swipedUser = req.body.id

    if(direction === "right"){
      await user.addSwiped(swipedUser, {
        through: {
          isRightSwipe: true
        }
      })
    } else if (direction === "left"){
      await user.addSwiped(swipedUser, {
        through: {
          isRightSwipe: false
        }
      })
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
})

module.exports = router
