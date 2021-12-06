import axios from "axios"

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
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://192.168.39.131:8080/api/users`)
    dispatch(setUsers(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const getPond = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://192.168.39.131:8080/api/users/pond/${userId}`
    )
    dispatch(setPond(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addSwipe = (direction, id) => async (dispatch) => {
  try {
    dispatch(_addSwipe(id))
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
        if (user.id !== action.id) {
          return user
        }
      })
      return { ...state, users: filteredArray }
    }
    default:
      return state
  }
}
