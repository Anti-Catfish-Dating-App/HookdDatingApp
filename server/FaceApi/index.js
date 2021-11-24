const app = require("../app")
const axios = require("axios")

require("dotenv").config()

const key = process.env.FACEAPIKEY1
// const facelist_id = "class-3e-facelist" // the ID of the face list we'll be working with

// const base_instance_options = {
//   baseURL: `https://${loc}/face/v1.0`,
//   timeout: 1000,
//   headers: {
//     "Content-Type": "application/json",
//     "Ocp-Apim-Subscription-Key": key,
//   },
// }

// app.post(`${process.env.FACEAPIENDPOINT}/face/v1.0/verify`, { headers: })

const compareImage = async () => {
  try {
    //Test Images
    const image1 =
      "https://www.pngall.com/wp-content/uploads/5/Biden-Transparent.png"

    const image2 =
      "https://nypost.com/wp-content/uploads/sites/2/2021/11/JoeBiden-4.jpg"

    //First Image Post - Get FaceId
    const firstImage = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400`,
      { url: image1 },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/json",
        },
      }
    )

    //Second Image Post - Get FaceId
    const secondImage = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400`,
      { url: image2 },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/json",
        },
      }
    )

    //Comparison of the two Images
    const verify = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/verify?`,
      {
        faceId1: firstImage.data[0].faceId,
        faceId2: secondImage.data[0].faceId,
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/json",
        },
      }
    )
    return verify
  } catch (error) {
    new Error(error)
  }
}

compareImage()
