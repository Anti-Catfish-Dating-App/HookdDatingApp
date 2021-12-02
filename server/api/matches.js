const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db")
const { requireToken } = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const userMatches = await Matches.findAll({
      where: {
        SwipedId: req.user.id,
        isRightSwipe: true
      }
    })
    const userSwipedMatchesIds = userMatches.map(x => x.userId)

    const otherUserSwipedMatchesIds = await Matches.findAll({
      where: {
        userId: req.user.id,
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

router.post("/", requireToken, async (req, res, next) => {
  try {
    const direction = req.body.direction
    const swipedUser = req.body.id

    if(direction === "right"){
      await req.user.addSwiped(swipedUser, {
        through: {
          isRightSwipe: true
        }
      })
    } else if (direction === "left"){
      await req.user.addSwiped(swipedUser, {
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
