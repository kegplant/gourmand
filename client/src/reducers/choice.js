import { ADD_CHOICE } from "../actions/choice";

export default function choice(state = {}, action) {
  switch (action.type) {
    case ADD_CHOICE:
      return {
        ...action.choice
      };
    default:
      return state;
  }
}
