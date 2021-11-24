import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk'

const reducer = combineReducers({
  auth: auth,
});

const middleware = applyMiddleware(thunkMiddleware.withExtraArgument({ axios }),);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
