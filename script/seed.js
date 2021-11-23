const {
  db,
  models: {
    Conversations,
    Images,
    Matches,
    Messages,
    NotMatches,
    Preferences,
    Reviews,
    User,
  },
} = require("../server/db")
const faker = require("faker")
require("dotenv").config()

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log("db synced!")

  console.log(process.env.FACEAPIKEY1)
  for (let i = 0; i < 10; i++) {
    let randomAge = Math.floor(Math.random() * 20 + 18)

    const user = await User.create({
      email: faker.internet.email(),
      password: "password12",
      gender: faker.name.gender(),
      age: randomAge,
      bio: `Just looking for the Pam to my Jim`,
      baselinePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Welchcorgipembroke.JPG",
      lastTimeVerified: 11 / 23 / 2040,
      isVerified: true,
    })
  }
}

async function runSeed() {
  console.log("seeding...")
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log("closing db connection")
    await db.close()
    console.log("db connection closed")
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
