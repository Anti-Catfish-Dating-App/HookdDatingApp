import "dotenv/config"

export default {
  name: "Hookd",
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
    ServerDomain:
      process.env.NODE_ENV === "development"
        ? process.env.LOCALHOST
        : "https://hookd-datingapp.herokuapp.com/",
  },
  ios: {
    bundleIdentifier: "com.Hookd.datingApp",
  },
}
