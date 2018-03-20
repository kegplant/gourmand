import axios from "axios";
import { flattenCategories } from "./helpers";

export function _getCategories(data) {
  return axios.post("/yelp/categories", data).then(data => {
    return flattenCategories(data.data);
  });
}
