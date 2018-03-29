import { ADD_RECOMMENDATIONS } from "../actions/recommendations";

export default function recommendations(state = [], action) {
  switch (action.type) {
    case ADD_RECOMMENDATIONS:
      return [...action.results];
    default:
      return state;
  }
}
