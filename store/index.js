import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import task from './task';
import user from './user';
import location from './location';
import places from './places';

const appReducer = combineReducers({ task, user, location, places });

const store = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
