import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import criteria from "./criteria";
import categories from "./categories";
import socket from "./socket";
import selection from "./selection";
import details from "./details";
import mongo from "./mongo";
import recommendations from "./recommendations";

export default combineReducers({
  criteria,
  categories,
  socket,
  selection,
  details,
  mongo,
  recommendations,
  loadingBar: loadingBarReducer
});
