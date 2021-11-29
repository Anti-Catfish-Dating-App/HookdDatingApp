const router = require("express").Router()
const {
  models: { User },
} = require("../db")

// route to edit user profile
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { profilePicture, age, bio } = req.body
    const user = await User.findByPk(id)
    if (!user) {
      const error = Error("User not found")
      error.status = 404
      throw error
    }
    await user.update({
      profilePicture,
      age,
      bio,
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// route to get user profile
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      const error = Error("User not found")
      error.status = 404
      throw error
    }
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// route to get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

// route to delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      const error = Error("User not found")
      error.status = 404
      throw error
    }
    await user.destroy()
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// route to create user
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// route to get user by gender
router.get("/gender/:gender", async (req, res, next) => {
  try {
    const { email } = req.params
    const user = await User.findAll({
      where: { gender },
    })
    if (!user) {
      const error = Error("User not found")
      error.status = 404
      throw error
    }
    res.send(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
