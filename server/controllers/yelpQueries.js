const yelp = require("yelp-fusion");
const config = require("../config/config.json");
const apiKey = config.yelp.Key;
const client = yelp.client(apiKey);
const mongoose = require("mongoose");

const meal = ["breakfast", "lunch", "dinner"];
const price = ["1, 2, 3, 4", "1", "2", "3", "4"];
let fakeQuery = {
  address: '566 Arguello Way',
  location: '3',
  meal: 2,
  price: '1'
}
const Poll = mongoose.model("Poll");

module.exports = {
  categories: function (req, res) {
    const query = formatQuery(req.body);
    client
      .search(query)
      .then(response => {
        res.json(categoryBuilder(response.jsonBody.businesses));
      })
      .catch(e => {
        console.log(e);
      });
  },
  getRecommendations: function (req, res) {
    const query = formatQuery(fakeQuery);
    client
      .search(query)
      .then(response => {
        res.json(response.jsonBody.businesses.slice(0, 3));
      })
      .catch(e => {
        console.log(e);
      });
  }
};

formatQuery = function (query) {
  //result sorted by "best match" at the moment
  //code to format the query
  return {
    term: meal[query.meal - 1], //correct
    price: price[query.price - 1], //correct
    location: query.address, //takes zipcode as well
    radius: query.location * 1600, //correct
    limit: 50 //maximum per query; can use offect:50 to get 51-100 etc.
  };
};

categoryBuilder = function (businesses) {
  let categories = {};
  businesses.forEach(business => {
    business.categories.forEach(category => {
      categories[category.title] = categories[category.title] ?
        categories[category.title] + 1 :
        1;
    });
  });
  // categories=Object.entries(categories);
  let categoryList = [];
  for (category in categories) {
    let entry = {
      category: category,
      number: categories[category],
      image: "static/images/chinese.png"
    };
    categoryList.push(entry); //could use some optimization
  }
  categoryList.sort((a, b) => b.number - a.number);
  return categoryList;
};