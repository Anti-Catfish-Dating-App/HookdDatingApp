const router = require("express").Router()
const {
  models: { User, Reviews },
} = require("../db");




router.post("/", async (req, res, next) => {
  try {
    const reviewer = await User.findByToken(req.headers);
    console.log("REVIEWER: ", reviewer.id);
    const { review, reviewedUser } = req.body.reviewInfo
    const rating = parseInt(req.body.reviewInfo.rating)
    console.log("1-", review);
    console.log("2-", reviewedUser);
    console.log("3-", rating);
    const createdReview = await Reviews.create({
      rating: rating,
      reviewText: review,
      reviewedUser: reviewedUser,
      reviewer: reviewer.id
    })

    res.send(createdReview);

  } catch (error) {
    next(error)
  }
})




module.exports = router
