import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import task from './task';
import user from './user';
import location from './location';
import place from './places';
import group from './group';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({ task, user, location, place, group });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware)
);

// export const persistor = persistStore(store);
