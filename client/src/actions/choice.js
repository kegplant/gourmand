import { _addChoice } from "../utils/_API";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_CHOICE = "ADD CHOICE";

export function addChoice(choice) {
  return {
    type: ADD_CHOICE,
    choice
  };
}

export function handleAddChoice(choice, pollID, cb) {
  return dispatch => {
    dispatch(showLoading());
    _addChoice(choice, pollID).then(result => {
      const choice = JSON.parse(result.choice);
      dispatch(addChoice(choice));
      cb();
      dispatch(hideLoading());
    });
  };
}
