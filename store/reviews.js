import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ADD_REVIEW = "ADD_REVIEW"

export const _addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

export const addReview = (reviewInfo) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(`https://hookd-datingapp.herokuapp.com/api/reviews`, {reviewInfo}, {
      headers: {
        authorization: token
      }
    });
    dispatch(_addReview(res.data));
    return res.status
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  review: {},
  allUserReviews: []
}

export default function(state = initialState, action){
  switch (action.type){
    case ADD_REVIEW:
      return {
        ...state, review: action.review
      }
    default:
      return state
  }
}
