import { ADD_CATEGORIES } from "../actions/categories";

export default function categories(state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...action
      };
    default:
      return state;
  }
}
