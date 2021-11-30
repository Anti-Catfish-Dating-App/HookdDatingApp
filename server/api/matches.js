const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db")

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers);


    //Where swipedId = userId && boolean === true
    const matches = await Matches.findAll({
      where: {
        SwipedId: user.id,
        isRightSwipe: true
      }
    })

    const allMatches = matches.map(x => x.userId)
    //console.log(allMatches);
    const otherMatches = await Matches.findAll({
      where: {
        userId: user.id,
        isRightSwipe: true
      }
    })
    const allMatches2 = otherMatches.map(x => x.SwipedId);
    //console.log(allMatches2);

    const data = allMatches.filter(item => allMatches2.includes(item))
    console.log(data);

    const matchData = await data.map(async x => await User.findByPk(x))
    const matchedUsers = await Promise.all(matchData)
    console.log(matchedUsers);

    res.send(matchedUsers);
  } catch (error) {
    next(error)
  }
})

module.exports = router
