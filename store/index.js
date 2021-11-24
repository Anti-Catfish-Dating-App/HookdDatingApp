import { createStore, combineReducers, applyMiddleware } from "redux"
import auth from "./auth"
import singleUser from "./singleUser"

const reducer = combineReducers({
  auth: auth,
  singleUser: singleUser,
})

const store = createStore(reducer)

export default store
export * from "./auth"
