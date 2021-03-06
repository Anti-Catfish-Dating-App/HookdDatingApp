import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import domainName from "./domainName"

//action types
const SET_MESSAGES = "SET_MESSAGES"
const EMPTY_MESSAGES = "EMPTY_MESSAGES"
const SEND_MESSAGE = "SEND_MESSAGE"

//action creators
export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  }
}

export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    message,
  }
}

export const emptyMessages = () => {
  return {
    type: EMPTY_MESSAGES,
  }
}

//thunk creators
export const fetchMessages = (id) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const res = await axios.get(`${domainName}api/messages/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      dispatch(setMessages(res.data))
    } catch (err) {
      dispatch(emptyMessages())
      console.log(err)
    }
  }
}

export const sendMessageThunk = (id, message) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const res = await axios.post(
        `${domainName}api/messages`,
        {
          message: message,
          receiverId: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      dispatch(sendMessage(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages
    case SEND_MESSAGE:
      return [...state, action.message]
    case EMPTY_MESSAGES:
      return []
    default:
      return state
  }
}
