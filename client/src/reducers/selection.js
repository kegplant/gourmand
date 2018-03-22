import {
  ADD_SELECTION,
  ADD_ALL_SELECTIONS,
  REMOVE_SELECTION,
  REMOVE_ALL_SELECTIONS
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
          const { number, image } = state[element];
          acc[element] = {
            category: element,
            number,
            image,
            votes: {
              number: 0,
              voters: []
            }
          };
          return acc;
        }, {});
      return {
        ...newState
      };
    case REMOVE_ALL_SELECTIONS:
      return {};
    default:
      return state;
  }
}
