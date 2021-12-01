const router = require("express").Router()
const {
  models: { User, Reviews },
} = require("../db");

router.get("/:reviewedId", async (req, res, next) => {
  try {
    const allUserReviewInfo = await Reviews.findAll({
      where: {
        reviewedUser: req.params.reviewedId
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

router.post("/", async (req, res, next) => {
  try {
    const reviewer = await User.findByToken(req.headers);
    const { review, reviewedUser } = req.body.reviewInfo
    const rating = parseInt(req.body.reviewInfo.rating)


    const createdReview = await Reviews.findOrCreate({
      where: {
        reviewedUser: reviewedUser,
        reviewer: reviewer.id
      },
      defaults: {
        rating: rating,
        reviewText: review,
        reviewedUser: reviewedUser,
        reviewer: reviewer.id
      }
    })

    res.send(createdReview);

  } catch (error) {
    next(error)
  }
})




module.exports = router
