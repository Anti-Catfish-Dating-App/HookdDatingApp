const router = require("express").Router()
const { User } = require("../db/models/User")
const axios = require("axios")
const cloudinary = require("cloudinary").v2
require("dotenv").config()

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.FACEAPIKEY1,
  api_secret: process.env.CLOUDSECRET,
  secure: true,
})

router.post("/", async (req, res, next) => {
  try {
    console.log(
      "INSIDE THE FACEAPI ROUTER",
      req.body.data.imageData._parts[0][1].uri
    )

    const imageUrl = await cloudinary.uploader.upload(
      req.body.data.imageData._parts[0][1].uri,
      function (error, result) {
        console.log(result, error)
      }
    )

    console.log("INSIDE THE FACEAPI ROUTER///////////", imageUrl)

    const key = process.env.FACEAPIKEY1

    // const firstImage = await axios.post(
    //   `${process.env.FACEAPIENDPOINT}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400`,
    //   { url: imageUrl },
    //   {
    //     headers: {
    //       "Ocp-Apim-Subscription-Key": key,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )

    // res.send(firstImage)
  } catch (error) {
    next(error)
  }
})

module.exports = router
