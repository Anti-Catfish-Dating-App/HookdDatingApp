const router = require("express").Router()
const {
  models: { User },
} = require("../db")
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

router.post("/", upload.any(), async (req, res, next) => {
  try {
    console.log("INSIDE THE FACEAPI ROUTER", req)
    console.log("FILE PATH IN SERVER", req.files[0].path)

    //Cloudinary Config for API
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.CLOUDKEY,
      api_secret: process.env.CLOUDSECRET,
      secure: true,
    })

    //Upload Photo to Cloudinary to be processed by Microsoft API
    const imageUrl = await cloudinary.uploader.upload(
      req.files[0].path,
      function (error, result) {
        console.log(result, error)
      }
    )

    //Check for faces in the image
    const firstImage = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400`,
      { url: imageUrl.url },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.FACEAPIKEY1,
          "Content-Type": "application/json",
        },
      }
    )

    // console.log(firstImage)

    if (firstImage.data.length > 0) {
      // console.log(firstImage.data)
      // console.log(req.files[0])
      //Update User BaselineImageURL && FaceId here
      let userId = parseInt(req.files[0].originalname)
      let user = await User.findByPk(userId)

      user.baselinePhoto = imageUrl.url
      user.baselineFaceID = firstImage.data[0].faceId
      await user.save()
      res.send(user)
    } else {
      let userId = parseInt(req.files[0].originalname)
      let user = await User.findByPk(userId)

      res.send(user)
    }
  } catch (error) {
    next(error)
  }
})

router.post("/profilepic/:id", upload.any(), async (req, res, next) => {
  try {
    console.log("INSIDE THE FACEAPI ROUTER", req)
    console.log("FILE PATH IN SERVER", req.files[0].path)

    //Cloudinary Config for API
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.CLOUDKEY,
      api_secret: process.env.CLOUDSECRET,
      secure: true,
    })

    //Upload Photo to Cloudinary to be processed by Microsoft API
    const imageUrl = await cloudinary.uploader.upload(
      req.files[0].path,
      function (error, result) {
        console.log(result, error)
      }
    )

    //Check for faces in the image
    const firstImage = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400`,
      { url: imageUrl.url },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.FACEAPIKEY1,
          "Content-Type": "application/json",
        },
      }
    )

    console.log(firstImage)

    const user = await User.findByPk(req.params.id)

    if (firstImage.data.length < 1) {
      res.status(444).send(user)
    }

    const profilePicFaceId = firstImage.data[0].faceId
    console.log(user)
    const baselineFaceId = user.dataValues.baselineFaceID
    const verify = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/verify?`,
      {
        faceId1: profilePicFaceId,
        faceId2: baselineFaceId,
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.FACEAPIKEY1,
          "Content-Type": "application/json",
        },
      }
    )

    if (verify.data.isIdentical) {
      user.profilePicture = imageUrl.url
      user.isVerified = true
      user.lastTimeVerified = new Date()
      await user.save()
      res.send(user)
    } else {
      res.status(445).send(user)
    }
    console.log(verify)
  } catch (error) {
    next(error)
  }
})

module.exports = router
