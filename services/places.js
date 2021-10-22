
import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';

export const getPlacesByCategory = async (category) => {
    try {
      let location = {
        "coords": {
          "accuracy": 65,
          "altitude": 22.22926902770996,
          "altitudeAccuracy": 10,
          "heading": -1,
          "latitude": 40.716243684023844,
          "longitude": -73.96506528362589,
          "speed": -1,
        },
        "timestamp": 1634932943246.0232,
      }

      let radius = 1000;

      const nearbyBase = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
      const queryBase = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
      const api = `&key=${GOOGLE_PLACES_API}`;
      let types = [category];
      let placeIds = [];
      let places = [];
      let promises = [];

      await Promise.all(
        types.map(async (type) => {
          const locationUrl = `location=${location.coords.latitude},${location.coords.longitude}`;
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
                    res.results.map((element) => {
                      if (
                        placeIds.includes(element.place_id) ||
                        !element.types.includes(type)
                      ) {
                        return null;
                      } else {
                        const marketObj = {};
                        marketObj.id = element.place_id;
                        marketObj.name = element.name;
                        marketObj.types = element.types;
                        marketObj.photos = element.photos;
                        marketObj.rating = element.rating;
                        marketObj.vicinity = element.vicinity;
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
          }
          promises.push(newPromise);
        })
      );
      await Promise.all(promises).then(() => {
        if (places.length) {
          console.log(places,'end of places')
          return places
        } else {
          const status =
            'There are no locations currently near you for this task!';
        }
      });
    } catch (error) {
      console.log(error);
    }
};

export const optimize = async (tasks) => {
  //order the categories by number of tasks in that category

  const categoryPriority = {}
  tasks.forEach( (task) => {
    task.category.forEach( (category) => {
      if(categoryPriority[category]){
        categoryPriority[category] += 1
      } else {
        categoryPriority[category] = 1
      }
    })
  })

  let categoryOrderedByPriority = []
  Object.keys(categoryPriority).forEach( category => {
    categoryOrderedByPriority.push({ category, count: categoryPriority[category]})
  })

  categoryOrderedByPriority = categoryOrderedByPriority.sort( (a, b) => b.count - a.count).map( (a) => a.category)

  //find the closest store for the highest priority category
  //get the location coords
  //run the google places search using that location coord
  //sum up the distances from that location to each other category

  //
  const places =  getPlacesByCategory('grocery').then((value) => {
    console.log('resolved')
    console.log(value)
  })
  console.log('places', places)

}
