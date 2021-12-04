const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db")
const matchReducer = require("./findAllMatches");
const { Op } = require("sequelize");

const axios = require("axios")
const multer = require("multer") // Middleware to upload and save files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/tempStorage")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg") //Appending .jpg
  },
})
const upload = multer({ storage: storage })
const cloudinary = require("cloudinary").v2
require("dotenv").config()

// route to edit user profile
router.put("/:id", async (req, res, next) => {
  try {
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
router.get("/pond/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const matchData = await matchReducer(id);

    const allUsers = await User.findAll({
      where: {
        id: {
          [Op.not]: id
        }
      }
    })

    const matchFilteredUsers = allUsers.filter((user) => {
      if(!matchData.includes(user.id)){
        return user
      }
    })

    const loggedInUser = await User.findByPk(id)
    const userSexualOrientation = loggedInUser.sexualOrientation
    const userGender = loggedInUser.genderCategory
    /* const orientationFilter = matchFilteredUsers.filter((user) => {
      if (userSexualOrientation === "Bisexual") {
        return user
      }

      else if (userSexualOrientation === "Straight") {
        if (userGender === "Woman") {
          return (
            user.genderCategory === "Man" &&
            (user.sexualOrientation === "Straight" ||
              user.sexualOrientation === "Bisexual")
          )
        } else
          return (
            user.genderCategory ===
            (user.genderCategory === "Woman" &&
              (user.sexualOrientation === "Straight" ||
                user.sexualOrientation === "Bisexual"))
          )
      }

      else if (userSexualOrientation === "Gay") {
        if (userGender === "Man") {
          return (
            user.genderCategory === "Man" &&
            (user.sexualOrientation === "Gay" ||
              user.sexualOrientation === "Bisexual")
          )
        } else
          return (
            user.genderCategory === "Woman" &&
            (user.sexualOrientation === "Gay" ||
              user.sexualOrientation === "Bisexual")
          )
      }
    }) */

    const orientationFilter = matchFilteredUsers.filter((user) => {
      if (userGender === "Woman" && userSexualOrientation === "Bisexual") {
        if((user.genderCategory === "Man" && user.sexualOrientation !== "Gay") || (user.genderCategory === "Woman" && user.sexualOrientation === "Gay")){
          return user;
        }
      } else if (userGender === "Man" && userSexualOrientation === "Bisexual") {
        if((user.genderCategory === "Woman" && user.sexualOrientation !== "Gay") || (user.genderCategory === "Man" && user.sexualOrientation === "Gay")){
          return user;
        }
      } else if (userGender === "Woman" && userSexualOrientation === "Straight"){
        if(user.genderCategory === "Man" && user.sexualOrientation !== "Gay"){
          return user;
        }
      } else if (userGender === "Man" && userSexualOrientation === "Straight"){
        if(user.genderCategory === "Woman" && user.sexualOrientation !== "Gay"){
          return user;
        }
      } else if (userGender === "Woman" && userSexualOrientation === "Gay"){
        if(user.genderCategory === "Woman" && user.sexualOrientation !== "Straight"){
          return user;
        }
      } else if (userGender === "Man" && userSexualOrientation === "Gay"){
        if(user.genderCategory === "Man" && user.sexualOrientation !== "Straight"){
          return user;
        }
      }
    });

    res.send(orientationFilter)
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
