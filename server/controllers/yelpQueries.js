const yelp = require("yelp-fusion");
const config = require("../config/config.json");
const apiKey = config.yelp.Key;
const client = yelp.client(apiKey);

const meal = ["breakfast", "lunch", "dinner"];
const price = ["1, 2, 3, 4", "1", "2", "3", "4"];

module.exports = {
    categories: function (req, res) {
        console.log(req.body);
        const query = this.formatQuery(req.body);
        client
            .search(query)
            .then(response => {
                res.json(this.categoryBuilder(response.jsonBody.businesses));
            })
            .catch(e => {
                console.log(e);
            });
    },
    formatQuery: function (query) {
        //code to format the query
        return {
            term: meal[query.meal - 1], //correct
            price: price[query.price - 1], //correct
            location: query.address, //takes zipcode as well
            radius: query.location * 1600, //correct
            limit: 50
        };
    },
    categoryBuilder: function (businesses) {
        let categories = {};
        businesses.forEach(business => {
            business.categories.forEach(category => {
                categories[category.title] = categories[category.title] ? categories[category.title] + 1 : 1;
            })
        })
        return categories;
    }

};
