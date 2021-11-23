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
    const image1 =
      "https://www.pngall.com/wp-content/uploads/5/Biden-Transparent.png"

    const firstImage = await axios.post(
      `${process.env.FACEAPIENDPOINT}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400`,
      { url: image1 },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/json",
        },
      }
    )
    console.log(firstImage)
    return
  } catch (error) {
    new Error(error)
  }
}

compareImage()
