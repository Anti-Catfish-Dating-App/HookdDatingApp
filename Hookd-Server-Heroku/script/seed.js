const {
  db,
  models: {
    Conversations,
    Images,
    Matches,
    Messages,
    Preferences,
    Reviews,
    User,
  },
} = require('../db');
const faker = require('faker');
require('dotenv').config();

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const testUser = await User.create({
    name: 'test',
    profilePicture: 'https://pbs.twimg.com/media/E54a61HWEAI7EI4.jpg',
    email: 'test@test.com',
    password: '123',
    gender: 'Cat',
    genderCategory: 'Woman',
    sexualOrientation: 'Straight',
    age: 20,
    bio: `Just looking for the Pam to my Jim`,
    baselinePhoto: 'https://pbs.twimg.com/media/E54a61HWEAI7EI4.jpg',
    baselineFaceID: '1ed85b66-5085-4880-8edc-9f3cb0492d8d',
    lastTimeVerified: 11 / 23 / 2040,
    isVerified: true,
  });

  for (let i = 0; i < 10; i++) {
    let randomAge = Math.floor(Math.random() * 20 + 18);

    const genderCategory = ['Man', 'Woman'];
    const randomGender = genderCategory[Math.floor(Math.random() * 2)];
    const sexualOrientation = ['Straight', 'Gay', 'Bisexual'];
    const randomSexualOrientation =
      sexualOrientation[Math.floor(Math.random() * 3)];

    const user = await User.create({
      name: faker.name.findName(),
      profilePicture: faker.image.imageUrl(),
      email: faker.internet.email(),
      password: 'Password12',
      gender: faker.name.gender(),
      genderCategory: randomGender,
      sexualOrientation: randomSexualOrientation,
      age: randomAge,
      bio: `Just looking for the Pam to my Jim`,
      baselinePhoto:
        'https://upload.wikimedia.org/wikipedia/commons/f/fb/Welchcorgipembroke.JPG',
      baselineFaceID: '04e07a29-7a04-4feb-9fc5-363efafd358c',
      lastTimeVerified: 11 / 23 / 2040,
      isVerified: true,
    });
    //console.log(Object.keys(user.__proto__));
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
