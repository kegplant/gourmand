import axios from "axios";

export function _getCategories(data) {
  return axios.post("/yelp/categories", data).then(data => {
    return data.data;
  });
}
