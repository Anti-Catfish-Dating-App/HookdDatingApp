import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getToken } from "./headers"
import constants from "expo-constants"

console.log(constants.manifest.extra.ServerDomain)
console.log(process.env.NODE_ENV)

const DOMAIN_NAME = constants.manifest.extra.ServerDomain

const TOKEN = "token"
const SET_AUTH = "SET_AUTH"
const EDIT_PROFILE = "EDIT_PROFILE"
const EDIT_PROFILE_PIC = "EDIT_PROFILE_PIC"
const ADD_SWIPE = "ADD_SWIPE"

const setAuth = (auth) => ({ type: SET_AUTH, auth })
const editProfile = (user) => ({ type: EDIT_PROFILE, user })

export const editUser = (user) => async (dispatch) => {
  try {
    const tokenHeader = await getToken()

    const res = await axios.put(
      `https://hookd-datingapp.herokuapp.com/api/users/${user.id}`,
      user,
      {
        headers: {
          authorization: tokenHeader,
        },
      }
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
    const res = await axios.get(
      "https://hookd-datingapp.herokuapp.com/auth/me",
      {
        headers: {
          authorization: token,
        },
      }
    )
    return dispatch(setAuth(res.data))
  }
}

export const authenticate =
  (email, password, name, method) => async (dispatch) => {
    try {
      const res = await axios.post(
        `https://hookd-datingapp.herokuapp.com/auth/${method}`,
        {
          email,
          password,
          name,
        }
      )
      AsyncStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
      return res.status
    } catch (error) {
      return 405, dispatch(setAuth({ error: error }))
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
    case EDIT_PROFILE_PIC:
      return action.user
    case ADD_SWIPE:
      return action.user
    default:
      return state
  }
}
