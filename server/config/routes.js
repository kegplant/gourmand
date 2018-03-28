////////////////////////////////////////////////////////////////
//  SERVER/CONFIG/ROUTES.JS FILE
////////////////////////////////////////////////////////////////
// NOTE: "app" express application is passed to the current file
// from the server.js file when the node server starts.

// Require controller.js file and set it to a variable:
// ( Change the "controller" variable name and the controller file name
// within the 'controllers' directory. )
const controller = require("../controllers/controller_name_plural.js");
const yelpQueries = require("../controllers/yelpQueries.js");
const polls = require("../controllers/polls.js");

const dummy_data = require("./dummy_data");
// Export all routes to server.js:
module.exports = function(app) {
  // Root route - renders index.ejs view (for socket.io example):
  app.get("/", function(request, response) {
    response.render("index");
  });

  // Another example route - responses with JSON object:
  app.get("/users", function(request, response) {
    controller.getControllerMethod(request, response); //<-- CHANGE "controller" variable name(2)
  }); // <-- DO NOT ADD COMMAS if ADDING ROUTES BELOW.
  app.post("/yelp/categories", function(request, response) {
    console.log("in server");
    yelpQueries.categories(request, response);
  });

  app.post("/polls/new", function(request, response) {
    console.log("in polls");
    polls.create(request, response);
  });

  app.get("/polls/:id", function(request, response) {
    // console.log(request.params.id);
    // response.json(dummy_data);
    polls.get(request, response);
  });

  app.post("/votes/", function(request, response) {
    console.log(request.body);
    polls.update(request, response);
  });

  app.post("/recommendations/", function(request, response) {
    console.log(request.body); //contains _id of the poll
    yelpQueries.getRecommendations(request, response);
  });
};
