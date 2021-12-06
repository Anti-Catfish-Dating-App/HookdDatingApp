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
  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(5);
  const user3 = await User.findByPk(7);
  const user4 = await User.findByPk(4);
  const user5 = await User.findByPk(6);
  const user6 = await User.findByPk(8);
  await user1.addSwiped(user2, {
    through: {
      isRightSwipe: true,
    },
  });
  await user2.addSwiped(user1, {
    through: {
      isRightSwipe: true,
    },
  });
  await user1.addSwiped(user3, {
    through: {
      isRightSwipe: true,
    },
  });
  await user3.addSwiped(user1, {
    through: {
      isRightSwipe: false,
    },
  });
  await user6.addSwiped(user1, {
    through: {
      isRightSwipe: true,
    },
  });
  await user5.addSwiped(user1, {
    through: {
      isRightSwipe: true,
    },
  });
  await user1.addSwiped(user6, {
    through: {
      isRightSwipe: true,
    },
  });
  await user4.addSwiped(user1, {
    through: {
      isRightSwipe: true,
    },
  });
  await user1.addSwiped(user4, {
    through: {
      isRightSwipe: true,
    },
  });

  const rating = 4;
  const reviewText = "This is a review"
  await user1.addReviewedUser(user4, {
    through: {
      rating: rating,
      reviewText: reviewText
    }
  })

  await Reviews.findOrCreate({
    rating: rating,
    reviewText: reviewText,
    userId: 2,
    reviewedUserId: 5
  })
  const conversation3 = await Conversations.create({
    user1: user1.id,
    user2: user4.id,
  });
  const message5 = await Messages.create({
    message: 'Hi',
    userId: user1.id,
    conversationId: conversation3.id,
  });
  //seed user 2 with a message to user 1
  const message6 = await Messages.create({
    message: 'Hello',
    userId: user4.id,
    conversationId: conversation3.id,
  });
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
