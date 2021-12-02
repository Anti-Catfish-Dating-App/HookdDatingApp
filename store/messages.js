import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

//action types
const SET_MESSAGES = "SET_MESSAGES"

//action creators
export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  }
}

//thunk creators
export const fetchMessages = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const res = await axios.get("http://192.168.39.131:8080/api/messages", {
        headers: {
          Authorization: token,
        },
      })
      dispatch(setMessages(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_MESSAGES:
      return [state, ...action.messages]
    default:
      return state
  }
}
