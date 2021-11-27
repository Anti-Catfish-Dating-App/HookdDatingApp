const convict = require("convict")
const dotenv = require("dotenv")

dotenv.config()

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test", "local", "stage"],
    default: "local",
    env: "NODE_ENV",
  },
})

config.validate({ allowed: "strict" })

module.exports = () => {
  return { code: "module.exports = " + JSON.stringify(config.getProperties()) }
}
