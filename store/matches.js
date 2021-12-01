import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const SET_MATCHES = "SET_MATCHES"

export const setMatches = (matches) => ({
  type: SET_MATCHES,
  matches
})

export const getMatches = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(`http://192.168.0.6:8080/api/matches`, {
      headers: {
        authorization: token
      }
    });
    dispatch(setMatches(res.data));
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  matches: [],
}

export default function(state = initialState, action) {
  switch (action.type){
    case SET_MATCHES:
      return {...state, matches: action.matches}
    default:
      return state
  }
}
