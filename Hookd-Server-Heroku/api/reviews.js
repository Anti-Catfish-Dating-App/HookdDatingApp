const router = require("express").Router()
const {
  models: { Reviews },
} = require("../db");
const { requireToken } = require("./middleware");
const matchReducer = require("./findAllMatches")

router.get("/:userId", async (req, res, next) => {
  try {
    const allUserReviewInfo = await Reviews.findAll({
      where: {
        userId: req.params.userId
      }
    })
    const avgRating = (allUserReviewInfo.reduce((prev, curr) => {
      return prev + curr.rating
    }, 0)/ allUserReviewInfo.length);

    const userReviews = []
    allUserReviewInfo.forEach(x => {
      const obj = new Object();
      obj["rating"] = x.rating
      obj["reviewText"] = x.reviewText
      userReviews.push(obj);
    });

    res.send({avgRating, userReviews});
  } catch (error) {
    next(error)
  }
})

router.post("/", requireToken, async (req, res, next) => {
  try {
    const { review, reviewedUser } = req.body.reviewInfo
    const rating = parseInt(req.body.reviewInfo.rating)
    const createdReview = await Reviews.findOrCreate({
      where: {
        reviewerId: req.user.id,
        userId: reviewedUser
      },
      defaults: {
        rating: rating,
        reviewText: review,
        reviewerId: req.user.id,
        userId: reviewedUser
      }
    })
    res.send(createdReview);

  } catch (error) {
    next(error)
  }
})




module.exports = router
