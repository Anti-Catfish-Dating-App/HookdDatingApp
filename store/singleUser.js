import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

//action types
const SET_USER = "SET_USER"
const SET_ERROR = "SET_ERROR"
const SET_BASELINE = "SET_BASELINE"
const EDIT_PROFILE = "EDIT_PROFILE"
const EDIT_PROFILE_PIC = "EDIT_PROFILE_PIC"

//action creators
export const setUser = (user) => ({
  type: SET_USER,
  user,
})

export const setError = (error) => ({
  type: SET_ERROR,
  error,
})

export const setBaseLine = (user) => ({
  type: SET_BASELINE,
  user,
})

export const editProfile = (user) => ({
  type: EDIT_PROFILE,
  user,
})

export const editProfilePic = (user) => ({
  type: EDIT_PROFILE_PIC,
  user,
})

//thunk creators
export const getUser = (userId) => async (dispatch) => {
  try {
<<<<<<< HEAD
    const res = await axios.get(`http://192.168.0.6:8080/api/users/${userId}`)
=======
    const res = await axios.get(
      `https://hookd-datingapp.herokuapp.com/api/users/${userId}`
    )
>>>>>>> main
    dispatch(setUser(res.data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export const checkForFace = (imageData) => async (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } }

  const { data } = await axios.post(
    "https://hookd-datingapp.herokuapp.com/api/faceapi/",
    imageData,
    config
  )

  console.log("FRONT END CONSOLE LOG", data)

  if (data.baselinePhoto === null) {
    return "No face found"
  } else {
    dispatch(setBaseLine(data))
    return "Completed"
  }

  // dispatch(setBaseLine(data))
}

export const _editProfilePic = (imageData, id) => async (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } }

  const { data } = await axios.post(
    `https://hookd-datingapp.herokuapp.com/api/faceapi/profilepic/${id}`,
    imageData,
    config
  )
  console.log("FRONT END CONSOLE LOG", data)
  dispatch(editProfilePic(data))
}

//reducer
const initialState = {
  user: {},
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case SET_BASELINE:
      return { ...state, user: action.user }
    case EDIT_PROFILE_PIC:
      return { ...state, user: action.user }
    default:
      return state
  }
}
