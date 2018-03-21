import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import criteria from "./criteria";
import categories from "./categories";

export default combineReducers({
  criteria,
  categories,
  loadingBar: loadingBarReducer
});
