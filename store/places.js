import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';

const SET_PLACES = 'SET_PLACES';
const CLEAR_PLACES = 'CLEAR_PLACES';

export const setPlaces = (places) => {
  return {
    type: SET_PLACES,
    places,
  };
};

export const clearPlaces = () => {
  return {
    type: CLEAR_PLACES,
    places: [],
  };
};

export const _fetchPlaces = (task) => {
  return async (dispatch, getState) => {
    try {
      // clears the previously set places
      dispatch(clearPlaces());

      // const { location, task } = getState();
      // const tasks = task.tasks;
      let location = {
        coords: {
          accuracy: 5,
          altitude: 0,
          altitudeAccuracy: -1,
          heading: -1,
          latitude: 40.684922,
          longitude: -73.922862,
          speed: -1,
        },
        timestamp: 1634078817651.893,
      };
      // hardcoded radius, we can dynamically change this based on priority maybe?
      const radius = 500;

      // have to store type on the task
      let types = ['pharmacy', 'convenience_store'];

      const places = [];
      types.forEach((type) => {
        const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
        const locationUrl = `location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}`;
        const typeData = `&types=${type}`;
        const api = `&key=${GOOGLE_PLACES_API}`;

        const url = `${baseUrl}${locationUrl}${typeData}${api}`;

        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            res.results.map((element) => {
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

              console.log(marketObj);
              places.push(marketObj);
            });
          });
      });
      dispatch(setPlaces(places));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _highPriorityFetchPlaces = () => {
  return async (dispatch, getState) => {
    try {
      // clears the previously set places
      dispatch(clearPlaces());

      const { location, task } = getState();
      const tasks = task.tasks;
      // hardcoded radius, we can dynamically change this based on priority maybe?
      const radius = 500;

      // here we have to know which tasks we previously sent a push notification for, and send a push notification for the next task. Extract the task we want to send a push notification for from the tasks state
      // task.tasks.forEach((task) => {
      //   if (task.priority === 'HIGH') {
      //   }
      // });

      const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
      const locationUrl = `location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}`;
      const typeData = `&types=${type}`;
      const api = `&key=${GOOGLE_PLACES_API}`;

      const url = `${baseUrl}${locationUrl}${typeData}${api}`;

      fetch(url)
        .then((res) => res.json())
        .then(dispatch(setPlaces(res)));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_PLACES:
      return action.places;
    case CLEAR_PLACES:
      return action.places;
    default:
      return state;
  }
};
