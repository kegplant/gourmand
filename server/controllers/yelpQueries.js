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
        res.json(buildCategories(response.jsonBody.businesses));
      })
      .catch(e => {
        console.log(e);
      });
  },
  getRecommendations: function (req, res) {
    // req.body.pollID="5abac807693048a6f297e7df";//debug for now
    Poll.findById(req.body.pollID, (err,poll) => {
      if(err) errHandler(err, res);
      let query = updateQuery(poll, findTopCategories(poll));
      client.search(query).then(response => {
        res.json(buildRecommendations(response.jsonBody.businesses));
      }).catch(e=>{console.log(e)});
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

buildCategories = function (businesses) {
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

findTopCategories = function (poll){
  const maxVote = poll.selections.reduce((max, selection)=> max > selection.votes.number ? max : selection.votes.number, 0);
  console.log("maxVote is: ", maxVote);
  // console.log(poll.selections);
  let topCategories = [];
  poll.selections.forEach(selection => {
    if(selection.votes.number == maxVote){
      topCategories.push( selection.category);
    }
  })
  console.log("top categories: ",topCategories);
  return topCategories;
}
updateQuery = function (poll, topCategories) {
  let query = formatQuery(poll.criteria);
  // query.terms = [query.term].concat(topCategories); 
  // delete query.term;
  query.categories=topCategories.join(',')//"newamerican,asianfusion"
  console.log("query is: ", query);
  return query;
}
buildRecommendations = function (businesses) {
  console.log(`Returning 3 out of ${businesses.length} businesses.`)
  return businesses.slice(0,3);
}
function errHandler(err, res) {
  console.log(err);
  res.json({
    "status: ": err
  });
}