import axios from "axios";
import { flattenCategories } from "./helpers";

export function _getCategories(data) {
  return axios.post("/yelp/categories", data).then(data => {
    return flattenCategories(data.data);
  });
}

export function _createPoll(data) {
  return axios.post("/polls/new", data).then(data => {
    return data.data;
  });
}

export function _getSelection(id) {
  return axios.get(`/polls/${id}`).then(data => {
    return data.data;
  });
}

export function _addVote(data) {
  return axios.post("/votes/", data).then(result => {});
}
