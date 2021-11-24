import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';

const reducer = combineReducers({
  auth: auth,
});

const store = createStore(reducer);

export default store;
export * from './auth';
