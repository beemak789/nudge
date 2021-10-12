'use strict';

const { db, Type, Store, Store_Type } = require('../server/db');
const { green, red } = require('chalk');
const stores = require('./stores');

const types = [
  {
    type: 'convenience_store',
  },
  {
    type: 'drugstore',
  },
  {
    type: 'pharmacy',
  },
];

async function seed() {
  await db.sync({ force: true });

  const newTypes = await Promise.all(
    types.map((type) => {
      return Type.create(type);
    })
  );

  let visitedStores = [];
  let storeTypes = [];

  const newStores = await Promise.all(
    stores.map(async (store) => {
      if (!visitedStores.includes(store.place_id)) {
        visitedStores.push(store.place_id);

        const newStore = await Store.create({
          latitude: store.geometry.location.lat,
          longitude: store.geometry.location.lng,
          address: store.vicinity,
          geo: {
            type: 'Point',
            coordinates: [
              store.geometry.location.lng,
              store.geometry.location.lat,
            ],
          },
          ...store,
        });

        store.types.forEach(async (type) => {
          let typeId;
          newTypes.forEach((newType) => {
            if (type === newType.dataValues.type) {
              typeId = newType.dataValues.id;
            }
          });

          if (typeId) {
            storeTypes.push({ typeId: typeId, storeId: newStore.id });
          }
        });

        return newStore;
      }
    })
  );

  const newStoreTypes = await Promise.all(
    storeTypes.map(async (storeType) => {
      await Store_Type.create(storeType);
    })
  );

  console.log(green(`seeded ${newStores.length} stores`));
  console.log(green('Seeding success!'));
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(red('Oh no! Something went wrong!'));
    console.error(err);
    console.log(red(err));
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
