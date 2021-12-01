const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db")

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers);


    //Where swipedId = userId && boolean === true
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
    console.log(matchedUsers);

    res.send(matchedUsers);
  } catch (error) {
    next(error)
  }
})

module.exports = router
