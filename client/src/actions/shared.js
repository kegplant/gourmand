import { changeCriteria } from "./criteria.js";
import { _getCategories } from "../utils/_API";
import { addCategories } from "./categories";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleCriteriaChange(newCriteria) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    dispatch(changeCriteria(newCriteria));
    const { criteria } = getState();
    _getCategories(criteria).then(categories => {
      dispatch(addCategories(categories));
      dispatch(hideLoading());
    });
  };
}
