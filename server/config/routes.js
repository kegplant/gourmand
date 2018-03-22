////////////////////////////////////////////////////////////////
//  SERVER/CONFIG/ROUTES.JS FILE
////////////////////////////////////////////////////////////////
// NOTE: "app" express application is passed to the current file
// from the server.js file when the node server starts.

// Require controller.js file and set it to a variable:
// ( Change the "controller" variable name and the controller file name
// within the 'controllers' directory. )
var controller = require("../controllers/controller_name_plural.js");
var yelpQueries = require("../controllers/yelpQueries.js");
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
    response.json({ response: request.body });
  });

  app.get("/polls/:id", function(request, response) {
    console.log(request.params.id);
    response.json(dummy_data);
  });
};
