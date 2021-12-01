import singleUser from "./singleUser"
import users from "./users"
import { createStore, combineReducers, applyMiddleware } from "redux"
import auth from "./auth"
import axios from "axios"
import thunkMiddleware from "redux-thunk"
import matches from './matches'
import reviews from "./reviews"

const reducer = combineReducers({
  auth: auth,
  singleUser: singleUser,
  users: users,
  matches: matches,
  reviews: reviews
})

const middleware = applyMiddleware(thunkMiddleware.withExtraArgument({ axios }))

const store = createStore(reducer, middleware)

export default store
export * from "./auth"
