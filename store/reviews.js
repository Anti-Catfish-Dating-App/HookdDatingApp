import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getToken } from "./headers"

const ADD_REVIEW = "ADD_REVIEW"
const GET_USER_REVIEWS = "GET_USER_REVIEWS"

export const _addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

export const _getReviews = (reviews) => ({
  type: GET_USER_REVIEWS,
  reviews
})

export const addReview = (reviewInfo) => async (dispatch) => {
  try {
    const tokenHeader = await getToken();
    const res = await axios.post(`http://192.168.0.6:8080/api/reviews`, {reviewInfo}, {
      headers: {
        authorization: tokenHeader
      }
    });
    dispatch(_addReview(res.data));
    return res.status
  } catch (error) {
    console.log(error);
  }
}

export const getReviews = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://192.168.0.6:8080/api/reviews/${userId}`);
    dispatch(_getReviews(res.data));
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  review: {},
  allUserReviews: [],
  avgRating: null
}

export default function(state = initialState, action){
  switch (action.type){
    case ADD_REVIEW:
      return {
        ...state, review: action.review
      }
    case GET_USER_REVIEWS:
      return {
        ...state,
        allUserReviews: action.reviews.userReviews,
        avgRating: action.reviews.avgRating
      }
    default:
      return state
  }
}
