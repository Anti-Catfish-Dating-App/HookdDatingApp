const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db")
const { Op } = require("sequelize")
require("dotenv").config()
const { requireToken, checkId } = require("./middleware")

// route to edit user profile
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (!checkId(req.user.id, req.params.id)) {
      res.send("You're not authorized to view this")
      return
    }

    const { id } = req.params
    const { profilePicture, age, bio, gender } = req.body
    const user = await User.findByPk(id)
    if (!user) {
      const error = Error("User not found")
      error.status = 404
      throw error
    }
    await user.update(req.body)
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

// route to get user pond
router.get("/pond/:id", requireToken, async (req, res, next) => {
  try {
    if (!checkId(req.user.id, req.params.id)) {
      res.send("You're not authorized to view this")
      return
    }

    const { id } = req.params
    const userMatches = await Matches.findAll({
      attributes: ["SwipedId"],
      where: { userId: id },
    }).then((matchArr) => matchArr.map((x) => x.SwipedId))

    const allUsers = await User.findAll({
      where: {
        id: {
          [Op.not]: id,
        },
        isVerified: true,
      },
      attributes: [
        "id",
        "name",
        "profilePicture",
        "gender",
        "genderCategory",
        "sexualOrientation",
        "age",
        "bio",
      ],
    })

    const matchFilteredUsers = allUsers.filter((user) => {
      if (!userMatches.includes(user.id)) {
        return user
      }
    })

    const loggedInUser = await User.findByPk(id)
    const userSexualOrientation = loggedInUser.sexualOrientation
    const userGender = loggedInUser.genderCategory

    //Refactor to query this info from the database vs current implementation
    const orientationFilter = matchFilteredUsers.filter((user) => {
      if (userGender === "Woman" && userSexualOrientation === "Bisexual") {
        if (
          (user.genderCategory === "Man" && user.sexualOrientation !== "Gay") ||
          (user.genderCategory === "Woman" &&
            user.sexualOrientation !== "Straight")
        ) {
          return user
        }
      } else if (userGender === "Man" && userSexualOrientation === "Bisexual") {
        if (
          (user.genderCategory === "Woman" &&
            user.sexualOrientation !== "Gay") ||
          (user.genderCategory === "Man" &&
            user.sexualOrientation !== "Straight")
        ) {
          return user
        }
      } else if (
        userGender === "Woman" &&
        userSexualOrientation === "Straight"
      ) {
        if (user.genderCategory === "Man" && user.sexualOrientation !== "Gay") {
          return user
        }
      } else if (userGender === "Man" && userSexualOrientation === "Straight") {
        if (
          user.genderCategory === "Woman" &&
          user.sexualOrientation !== "Gay"
        ) {
          return user
        }
      } else if (userGender === "Woman" && userSexualOrientation === "Gay") {
        if (
          user.genderCategory === "Woman" &&
          user.sexualOrientation !== "Straight"
        ) {
          return user
        }
      } else if (userGender === "Man" && userSexualOrientation === "Gay") {
        if (
          user.genderCategory === "Man" &&
          user.sexualOrientation !== "Straight"
        ) {
          return user
        }
      }
    })

    // if (!checkId(req.user.id, req.params.id)) {
    //   res.send("You're not authorized to view this")
    //   return
    // }

    res.send(orientationFilter)
  } catch (error) {
    next(error)
  }
})

// route to delete user
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (!checkId(req.user.id, req.params.id)) {
      res.status(400).send("You're not authoized to view this")
    }

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

module.exports = router
