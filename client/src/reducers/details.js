import { ADD_DETAILS } from "../actions/details";

export default function details(state = {}, action) {
  switch (action.type) {
    case ADD_DETAILS:
      return {
        ...state,
        ...action.details
      };
    default:
      return state;
  }
}
