import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';

export const getPlacesByCategory = async (
  category,
  location = { latitude: 40.716243684023844, longitude: -73.9650652836 }
) => {
  try {
    // let location = {
    //   coords: {
    //     accuracy: 65,
    //     altitude: 22.22926902770996,
    //     altitudeAccuracy: 10,
    //     heading: -1,
    //     latitude: 40.716243684023844,
    //     longitude: -73.96506528362589,
    //     speed: -1,
    //   },
    //   timestamp: 1634932943246.0232,
    // };

    let radius = 1000;

    const nearbyBase = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const queryBase = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
    const api = `&key=${GOOGLE_PLACES_API}`;
    let type = category;
    let placeIds = [];
    let places = [];
    let promises = [];

    const locationUrl = `location=${location.latitude},${location.longitude}`;
    const radiusUrl = `&radius=${radius}`;
    const typeData = `&types=${type}`;

    let url = `${nearbyBase}${locationUrl}${radiusUrl}${typeData}${api}`;

    let newPromise;
    if (type === 'other') {
      const search = currTask.name.replace(/\s/g, '%');
      const query = `&query=${search}`;

      url = `${queryBase}${locationUrl}${query}${radiusUrl}${api}`;

      newPromise = new Promise((res, rej) => {
        res(
          fetch(url)
            .then((res) => res.json())
            .then((res) => {
              res.results.map((element) => {
                if (placeIds.includes(element.place_id)) {
                  return null;
                } else {
                  const marketObj = {};
                  marketObj.id = element.place_id;
                  marketObj.name = element.name;
                  marketObj.types = element.types;
                  marketObj.photos = element.photos;
                  marketObj.rating = element.rating;
                  marketObj.vicinity = element.formatted_address;
                  marketObj.marker = {
                    latitude: element.geometry.location.lat,
                    longitude: element.geometry.location.lng,
                  };

                  placeIds.push(marketObj.id);
                  places.push(marketObj);
                }
              });
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
    // console.log('new promise', newPromise)
    // newPromise.then((value) => {
    //   console.log('value', value)
    // });
  } catch (error) {
    console.log(error);
  }
};

export const optimize = async (tasks) => {
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

  let max = Math.min(categoryOrderedByPriority.length, 3);

  //return the two closest stores to complete the other categories of tasks
  const places = await getPlacesByCategory(categoryOrderedByPriority[0]).then(
    async (value) => {
      // let topThree = [...value.slice(2)]
      let closest = value[0]

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
      return result
    }
  );

  return places
};
