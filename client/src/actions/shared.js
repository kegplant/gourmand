import { changeCriteria } from "./criteria.js";
import { _getCategories } from "../utils/_API";
import { addCategories } from "./categories";

export function handleCriteriaChange(newCriteria) {
  return (dispatch, getState) => {
    dispatch(changeCriteria(newCriteria));
    const { criteria } = getState();
    _getCategories(criteria).then(categories => {
      dispatch(addCategories(categories));
    });
  };
}
