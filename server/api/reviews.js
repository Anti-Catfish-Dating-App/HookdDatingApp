const router = require("express").Router()
const {
  models: { User, Reviews },
} = require("../db");




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
