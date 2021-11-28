import axios from "axios"

//action types
const SET_USER = "SET_USER"
const SET_ERROR = "SET_ERROR"
const SET_BASELINE = "SET_BASELINE"

//action creators
export const setUser = (user) => ({
  type: SET_USER,
  user,
})

export const setError = (error) => ({
  type: SET_ERROR,
  error,
})

export const setBaseLine = (baselineImg) => ({
  type: SET_BASELINE,
  baselineImg,
})

//thunk creators
export const fetchUser = () => async (dispatch) => {
  const token = localStorage.getItem("token")
  if (token) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/users/user`, {
          headers: {
            Authorization: token,
          },
        })
        dispatch(setUser(data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
}

export const checkForFace = (imageData) => async (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } }

  const { data } = await axios.post(
    "http://192.168.39.131:8080/api/faceapi/",
    imageData,
    config
  )

  if (data.length > 0) {
    return "Completed"
  } else {
    return "No face found"
  }
  // dispatch(setBaseLine(data))
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
    default:
      return state
  }
}
