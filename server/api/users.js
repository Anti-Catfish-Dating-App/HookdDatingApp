const router = require("express").Router()
const { User } = require("../db/models/User")

// get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "gender", "bio", "age", "email"],
    })
    res.send(users)
  } catch (error) {
    next(error)
  }
})

// get one user
router.get("/user", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
