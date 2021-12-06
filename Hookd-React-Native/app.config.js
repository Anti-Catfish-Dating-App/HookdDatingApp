import "dotenv/config"

export default {
  name: "CoolApp",
  version: "1.0.0",
  extra: {
    JWT: process.env.JWT,
    FaceAPIKey1: process.env.FACEAPIKEY1,
    FaceAPIKey2: process.env.FACEAPIKEY2,
    FaceAPILocation: process.env.FACEAPILOCATION,
    FaceAPIENDPoint: process.env.FACEAPIENDPOINT,
    CloudinaryName: process.env.CLOUDNAME,
    CloudinaryKey: process.env.CLOUDKEY,
    CloudinarySecret: process.env.CLOUDSECRET,
    localhost: process.env.LOCALHOST,
  },
}
