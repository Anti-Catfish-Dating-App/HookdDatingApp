const {
  models: { Matches },
} = require("../db")

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

module.exports = matchReducer
