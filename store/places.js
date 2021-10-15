import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';
import { setCurrTask } from './task';

const SET_PLACES = 'SET_PLACES';
const CLEAR_PLACES = 'CLEAR_PLACES';
const SET_STATUS = 'SET_STATUS';

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
    status: '',
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    places: [],
    status,
  };
};

export const _fetchPlaces = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(clearPlaces());

      const { location, task } = getState();
      const tasks = task.incomplete;
      const currTask = tasks[Math.floor(Math.random() * tasks.length)];

      let radius = 1000;
      if (task.priority === 'high') {
        radius = 1000;
      } else if (task.priority === 'medium') {
        radius = 800;
      } else if (task.priority === 'low') {
        radius = 400;
      }

      const nearbyBase = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
      const queryBase = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
      const api = `&key=${GOOGLE_PLACES_API}`;
      let types = [...currTask.category];
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
        console.log('plaaaaces', places);
        if (places.length) {
          dispatch(setPlaces(places));
          dispatch(setCurrTask(currTask));
        } else {
          const status =
            'There are no locations currently near you for this task!';
          dispatch(setStatus(status));
          dispatch(setCurrTask(currTask));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  status: '',
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places,
      };
    case CLEAR_PLACES:
      return {
        places: action.places,
        status: action.status,
      };
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};
