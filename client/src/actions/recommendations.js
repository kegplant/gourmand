import { _getRecommendations } from "../utils/_API";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_RECOMMENDATIONS = "ADD_RECOMMENDATIONS";

export function addRecommendations(recommendations) {
  return {
    type: ADD_RECOMMENDATIONS,
    results: recommendations
  };
}

export function handleGetRecommendations(pollID) {
  return dispatch => {
    dispatch(showLoading());
    _getRecommendations(pollID).then(results => {
      dispatch(addRecommendations(results));
      dispatch(hideLoading());
    });
  };
}
