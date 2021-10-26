import { GOOGLE_PLACES_API } from '@env';
import { Alert } from 'react-native';

export const getPlacesByCategory = async (type, location, name = '') => {
  try {
    let radius = 1000;

    const nearbyBase = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const queryBase = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
    const api = `&key=${GOOGLE_PLACES_API}`;

    const locationUrl = `location=${location.latitude},${location.longitude}`;
    const typeData = `&type=${type}`;

    let url = `${nearbyBase}${locationUrl}&rankby=distance${typeData}${api}`;

    let newPromise;
    if (type === 'other') {
      console.log('I GET TO THE OTHER IF STATEMENT******')
      const search = name.replace(/\s/g, '%');
      const query = `&query=${search}`;
      const radius = 1000

      url = `${queryBase}${locationUrl}&radius=${radius}${api}`;

      newPromise = new Promise((res, rej) => {
        res(
          fetch(url)
            .then((res) => res.json())
            .then((res) => {
              return res.results.map((element) => {
                return {
                  id: element.place_id,
                  name: element.name,
                  rating: element.rating,
                  vicinity: element.vicinity,
                  marker: {
                    latitude: element.geometry.location.lat,
                    longitude: element.geometry.location.lng,
                  },
                };
              });
            })
            .then((value) => {
              console.log('other category', value)
              return value;
            })
        );
      });
    } else {
      newPromise = new Promise((res, rej) => {
        res(
          fetch(url)
            .then((res) => res.json())
            .then((res) => {
              return res.results.map((element) => {
                return {
                  id: element.place_id,
                  name: element.name,
                  rating: element.rating,
                  vicinity: element.vicinity,
                  marker: {
                    latitude: element.geometry.location.lat,
                    longitude: element.geometry.location.lng,
                  },
                };
              });
            })
            .then((value) => {
              return value;
            })
        );
      });
    }
    return newPromise;
  } catch (error) {
    console.log(error);
  }
};

export const optimize = async (tasks, initalLocation) => {
  //order the categories by number of tasks in that category
  const categoryPriority = {};
  tasks.forEach((task) => {
    task.category.forEach((category) => {
      if(category !== 'other') {
        if (categoryPriority[category]) {
          categoryPriority[category] += 1;
        } else {
          categoryPriority[category] = 1;
        }
    }
    });
  });

  let categoryOrderedByPriority = [];
  Object.keys(categoryPriority).forEach((category) => {
    categoryOrderedByPriority.push({
      category,
      count: categoryPriority[category],
    });
  });

  if(categoryOrderedByPriority.length < 1) {
    alert('No applicable categories to optimize. Try including another store type in your tasks.')
    return []
  }
  categoryOrderedByPriority = categoryOrderedByPriority
    .sort((a, b) => b.count - a.count)
    .map((a) => a.category);

  //find the closest store (rated over 3.5) for category with the most tasks
  //get the location coords of that store
  //return the two closest stores to complete the next two categories with the highest number of tasks

  let max = Math.min(categoryOrderedByPriority.length, 3);

  const places = await getPlacesByCategory(categoryOrderedByPriority[0], initalLocation).then(
    async (value) => {
      let closest = value[0]
      //only return location if its higher than 3.5 star rating
      for(let i = 0; i < value.length; i++){
        if(value[i].rating >= 3.5) {
          closest =  value[i]
          break
        }
      }
      if(categoryOrderedByPriority.length === 1){
        return [closest]
      } else {
        const top = categoryOrderedByPriority.slice(1, max);
        const result = await Promise.all(
          top.map((cat) => {
            return getPlacesByCategory(cat, closest.marker).then((value) => {
              for(let i = 0; i < value.length; i++){
                if(value[i].rating >= 3.5) {
                  return value[i]
                }
              }
              return value[0];
            });
          })
        ).then((values) => {
          return values;
        });
        return [closest, ...result];
      }
    }
  );

  return places;
};
