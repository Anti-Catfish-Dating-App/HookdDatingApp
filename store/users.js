import axios from "axios"

//action types
const SET_USERS = "SET_USERS"
const SET_POND = "SET_POND"
//action creators
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
})

export const setPond = (users) => ({
  type: SET_USERS,
  users,
})

//thunk creators
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://192.168.1.161:8080/api/users`)
    dispatch(setUsers(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const getPond = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://192.168.1.161:8080/api/users/pond/${userId}`
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
    case SET_POND:
      return { ...state, users: action.users }
    default:
      return state
  }
}
