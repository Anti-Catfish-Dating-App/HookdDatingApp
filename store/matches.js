import axios from "axios"

const SET_MATCHES = "SET_MATCHES"

export const setMatches = (matches) => ({
  type: SET_MATCHES,
  matches
})

export const getMatches = (id) => async (dispatch) => {
  try {

  } catch (error) {
    console.log(error);
  }
}
