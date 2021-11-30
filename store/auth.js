import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
//require('dotenv').config();
const BASE_URL = process.env.REACT_APP_BASE_URL

const TOKEN = "token"

const SET_AUTH = "SET_AUTH"
const EDIT_PROFILE = "EDIT_PROFILE"

const setAuth = (auth) => ({ type: SET_AUTH, auth })
const editProfile = (user) => ({ type: EDIT_PROFILE, user })

export const editUser = (user) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://10.0.0.64:8080/api/users/${user.id}`,
      user
    )
    dispatch(editProfile(res.data))
    return res.status
  } catch (error) {
    console.log(error)
  }
}

export const me = () => async (dispatch) => {
  const token = await AsyncStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get("http://10.0.0.64:8080/auth/me", {
      headers: {
        authorization: token,
      },
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate =
  (email, password, name, method) => async (dispatch) => {
    try {
      console.log("AUTH", email, password, name)
      const res = await axios.post(`http://10.0.0.64:8080/auth/${method}`, {
        email,
        password,
        name,
      })
      AsyncStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
      return res.status
    } catch (error) {
      return dispatch(setAuth({ error: error }))
    }
  }

export const logout = () => {
  AsyncStorage.removeItem(TOKEN)
  return {
    type: SET_AUTH,
    auth: {},
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case EDIT_PROFILE:
      return { ...state, ...action.user }
    default:
      return state
  }
}
