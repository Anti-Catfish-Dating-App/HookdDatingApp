const router = require("express").Router()
const {
  models: { User, Matches },
} = require("../db");




router.post("/", async (req, res, next) => {
  try {
    console.log("REVIEW POST ROUTE");
  } catch (error) {
    next(error)
  }
})




module.exports = router
