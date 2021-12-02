const router = require("express").Router()

router.use("/users", require("./users"))
router.use("/faceapi", require("./faceapi"))
router.use("/matches", require("./matches"))
router.use("/messages", require("./messages"))
router.use("/reviews", require("./reviews"))

router.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})

module.exports = router
