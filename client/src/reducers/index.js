import { combineReducers } from "redux";

import criteria from "./criteria";
import categories from "./categories";

export default combineReducers({
  criteria,
  categories
});
