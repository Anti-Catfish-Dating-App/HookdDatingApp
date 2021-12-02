import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

//action types
const GET_MESSAGES = "GET_MESSAGES"
const ADD_MESSAGE = "ADD_MESSAGE"
const DELETE_MESSAGE = "DELETE_MESSAGE"
const UPDATE_MESSAGE = "UPDATE_MESSAGE"
const GET_MESSAGE = "GET_MESSAGE"

//action creators
export function getMessages() {
  return {
    type: GET_MESSAGES,
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
  }
}

export function deleteMessage(id) {
  return {
    type: DELETE_MESSAGE,
  }
}

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message,
  }
}

export function getMessage(id) {
  return {
    type: GET_MESSAGE,
  }
}

//thunk creators
export const getMessagesThunk = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const res = await axios.get("http://192.168.39.131:8080/api/messages", {
        headers: {
          Authorization: token,
        },
      })
      dispatch(getMessages())
    } catch (err) {
      console.log(err)
    }
  }
}

export const addMessageThunk = (message) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const res = await axios.post(
        "http://192.168.39.131:8080/api/messages",
        message,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      dispatch(addMessage(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case `${GET_MESSAGES}_FULFILLED`:
      return action.payload.data
    case `${ADD_MESSAGE}_FULFILLED`:
      return [...state, action.payload.data]
    case `${DELETE_MESSAGE}_FULFILLED`:
      return state.filter((message) => message.id !== action.payload.data.id)
    case `${UPDATE_MESSAGE}_FULFILLED`:
      return state.map((message) => {
        if (message.id === action.payload.data.id) {
          return action.payload.data
        } else {
          return message
        }
      })
    case `${GET_MESSAGE}_FULFILLED`:
      return action.payload.data
    default:
      return state
  }
}
