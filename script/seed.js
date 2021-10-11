'use strict';

// const { db } = require('../server/db');
// const { green, red } = require('chalk');
const stores = require('./stores');

async function seed() {
  // await db.sync({ force: true });

  let visitedStores = [];
  let duplicateCount = 0;

  const newStores = await Promise.all(
    stores.map((store) => {
      if (!visitedStores.includes(store.place_id)) {
        visitedStores.push(store.place_id);

        // where we would create our model instance
        // return Store.create(store);
      } else {
        duplicateCount++;
      }
    })
  );
  console.log(
    'number of new stores:' + newStores.length + ' ' + duplicateCount
  );
  // console.log(green(`seeded ${newStores.length} stores`));
  // console.log(green('Seeding success!'));
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    // console.error(red('Oh no! Something went wrong!'));
    console.error(err);
    // console.log(red(err));
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    // await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
