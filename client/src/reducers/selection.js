import {
  ADD_SELECTION,
  ADD_ALL_SELECTIONS,
  REMOVE_SELECTION
} from "../actions/selected";

export default function selection(state = {}, action) {
  switch (action.type) {
    case ADD_SELECTION:
      return {
        ...state,
        ...action.selected
      };
    case ADD_ALL_SELECTIONS:
      return {
        ...action.selected
      };
    case REMOVE_SELECTION:
      const newState = Object.keys(state)
        .filter(category => {
          return category != action.category;
        })
        .reduce((acc, element) => {
          acc[element] = true;
          return acc;
        }, {});
      return {
        ...newState
      };
    default:
      return state;
  }
}
