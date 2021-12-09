import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getToken } from "./headers"
import domainName from "./domainName"

const SET_MATCHES = "SET_MATCHES"
const ADD_SWIPE = "ADD_SWIPE"

export const setMatches = (matches) => ({
  type: SET_MATCHES,
  matches,
})

export const _addSwipe = (user, id) => ({
  type: ADD_SWIPE,
  user,
  id,
})

export const getMatches = () => async (dispatch) => {
  try {
    const tokenHeader = await getToken()

    const res = await axios.get(`${domainName}api/matches`, {
      headers: {
        authorization: tokenHeader,
      },
    })
    dispatch(setMatches(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addSwipe = (direction, id) => async (dispatch) => {
  try {
    const tokenHeader = await getToken()
    const res = await axios.post(
      `${domainName}api/matches`,
      { direction, id },
      {
        headers: {
          authorization: tokenHeader,
        },
      }
    )
    dispatch(_addSwipe(res.data, id))
    return res.status
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  matches: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MATCHES:
      return { ...state, matches: action.matches }
    case ADD_SWIPE:
      return { ...state }
    default:
      return state
  }
}
