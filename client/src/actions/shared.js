import { changeCriteria } from "./criteria.js";
import { _getCategories, _createPoll } from "../utils/_API";
import { addCategories } from "./categories";
import { showLoading, hideLoading } from "react-redux-loading";
import { addAllSelections } from "./selection";
import { reconcileSelections } from "../utils/helpers";

export function handleCriteriaChange(newCriteria) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    dispatch(changeCriteria(newCriteria));
    const { criteria, selection } = getState();

    _getCategories(criteria).then(categories => {
      dispatch(addCategories(categories));
      const selected = reconcileSelections(categories, selection);
      dispatch(addAllSelections(selected));
      dispatch(hideLoading());
    });
  };
}

export function handleCreatePoll() {
  return (dispatch, getState) => {
    const { selection, criteria, socket, details } = getState();
    const payload = {
      selection,
      criteria,
      socket,
      details
    };
    dispatch(showLoading());
    _createPoll(payload).then(data => {
      dispatch(hideLoading());
    });
  };
}
