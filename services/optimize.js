import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';

export const getPlacesByCategory = async (type, location) => {
  try {
    let radius = 1000;

    const nearbyBase = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const queryBase = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
    const api = `&key=${GOOGLE_PLACES_API}`;

    const locationUrl = `location=${location.latitude},${location.longitude}`;
    const radiusUrl = `&radius=${radius}`;
    const typeData = `&type=${type}`;

    let url = `${nearbyBase}${locationUrl}&rankby=distance${typeData}${api}`;

    let newPromise;
    if (type === 'other') {
      const search = currTask.name.replace(/\s/g, '%');
      const query = `&keyword=${search}`;

      url = `${queryBase}${locationUrl}&rankby=distance${query}${api}`;

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
      if (categoryPriority[category]) {
        categoryPriority[category] += 1;
      } else {
        categoryPriority[category] = 1;
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

  categoryOrderedByPriority = categoryOrderedByPriority
    .sort((a, b) => b.count - a.count)
    .map((a) => a.category);

  //find the closest store for the highest priority category
  //get the location coords
  //run the google places search using that location coord
  //return the two closest stores to complete the other categories of tasks

  let max = Math.min(categoryOrderedByPriority.length, 3);

  const places = await getPlacesByCategory(categoryOrderedByPriority[0], initalLocation).then(
    async (value) => {
      if(categoryOrderedByPriority.length === 1){
        return [value[0]]
      } else {
        let closest = value[0];
        const top = categoryOrderedByPriority.slice(1, max);
        const result = await Promise.all(
          top.map((cat) => {
            return getPlacesByCategory(cat, closest.marker).then((value) => {
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
