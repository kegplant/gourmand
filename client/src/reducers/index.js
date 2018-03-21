import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import criteria from "./criteria";
import categories from "./categories";
import socket from "./socket";
import selection from "./selection";

export default combineReducers({
  criteria,
  categories,
  socket,
  selection,
  loadingBar: loadingBarReducer
});
