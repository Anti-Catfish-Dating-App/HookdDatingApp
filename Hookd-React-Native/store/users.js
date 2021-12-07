import axios from "axios"
import { getToken } from "./headers"
//action types
const SET_USERS = "SET_USERS"
const SET_POND = "SET_POND"
const ADD_SWIPE = "ADD_SWIPE"
//action creators
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
})

export const setPond = (users) => ({
  type: SET_USERS,
  users,
})

export const _addSwipe = (userId) => ({
  type: ADD_SWIPE,
  userId,
})

//thunk creators
export const getPond = (userId) => async (dispatch) => {
  try {
    const tokenHeader = await getToken()

    const res = await axios.get(
      `https://hookd-datingapp.herokuapp.com/api/users/pond/${userId}`,
      {
        headers: {
          authorization: tokenHeader,
        },
      }
    )
    dispatch(setPond(res.data))
  } catch (error) {
    console.log(error)
  }
}

//reducer
//because of the way state declared props.users.users will give you corrct rendrings
const initialState = {
  users: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_POND: {
      return { ...state, users: action.users }
    }
    case ADD_SWIPE: {
      const users = { ...state }
      const usersArray = users.users
      const filteredArray = usersArray.filter((user) => {
        if (user.id !== action.user.id) {
          return user
        }
      })
      return { ...state, users: filteredArray }
    }
    default:
      return state
  }
}
