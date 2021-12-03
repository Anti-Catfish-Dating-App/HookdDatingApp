import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getToken } from "./headers"

const SET_MATCHES = "SET_MATCHES"
const ADD_SWIPE = "ADD_SWIPE"

export const setMatches = (matches) => ({
  type: SET_MATCHES,
  matches,
})

export const _addSwipe = (id) => ({
  type: ADD_SWIPE,
  id,
})

export const getMatches = () => async (dispatch) => {
  try {
    // const token = await AsyncStorage.getItem("token")

    // const res = await axios.get(`http://192.168.39.131:8080/api/matches`, {
    //   headers: {
    //     authorization: token,
    //   },
    // })
    // dispatch(setMatches(res.data))
    const tokenHeader = await getToken()

    const res = await axios.get(
      `https://hookd-datingapp.herokuapp.com/api/matches`,
      {
        headers: {
          authorization: tokenHeader,
        },
      }
    )
    dispatch(setMatches(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addSwipe = (direction, id) => async (dispatch) => {
  try {
    const tokenHeader = await getToken()
    const res = await axios.post(
      `https://hookd-datingapp.herokuapp.com/api/matches`,
      { direction, id },
      {
        headers: {
          authorization: tokenHeader,
        },
      }
    )
    dispatch(_addSwipe(id))
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
