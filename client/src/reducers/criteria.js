import { CHANGE_CRITERIA } from "../actions/criteria";

//reducer for criteria
export default function changeCriteria(state = {}, action) {
  switch (action.type) {
    case CHANGE_CRITERIA:
      return {
        ...state,
        ...action.criteria
      };
    default:
      return state;
  }
}
