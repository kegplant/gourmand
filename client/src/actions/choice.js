import { _addChoice } from "../utils/_API";

export const ADD_CHOICE = "ADD CHOICE";

export function addChoice(choice) {
  return {
    type: ADD_CHOICE,
    choice
  };
}

export function handleAddChoice(choice, pollID) {
  return dispatch => {
    _addChoice(choice, pollID).then(result => {
      const choice = JSON.parse(result.choice);
      dispatch(addChoice(choice));
    });
  };
}
