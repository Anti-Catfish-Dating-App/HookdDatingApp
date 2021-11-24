import axios from "axios"

//action types
const SET_USER = "SET_USER"
const SET_ERROR = "SET_ERROR"

//action creators
export const setUser = (user) => ({
  type: SET_USER,
  user,
})

export const setError = (error) => ({
  type: SET_ERROR,
  error,
})

//thunk creators
export const fetchUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/user")
    dispatch(setUser(data))
  } catch (error) {
    dispatch(setError(error))
  }
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
