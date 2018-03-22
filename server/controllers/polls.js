const mongoose = require("mongoose");
const Poll = mongoose.model("Poll");
const fakePoll = {
  selections: {
    "Asian Fusion": {
      category: "Asian Fusion",
      number: 2,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    },
    French: {
      category: "French",
      number: 2,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    },
    Diners: {
      category: "Diners",
      number: 2,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    },
    Burgers: {
      category: "Burgers",
      number: 4,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    },
    Cafes: {
      category: "Cafes",
      number: 4,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    },
    Caribbean: {
      category: "Caribbean",
      number: 1,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    },
    "American (Traditional)": {
      category: "American (Traditional)",
      number: 3,
      image: "static/images/chinese.png",
      votes: {
        number: 0,
        voters: []
      }
    }
  },
  criteria: {
    address: "566 Arguello Way",
    location: "3",
    meal: 2,
    price: "5"
  }
};

module.exports = {
  create: function(req, res) {
    //QUESTION FOR YOU SONG WHAT IS LINE 80 DOING?
    req.body.selections = Object.values(req.body.selection);

    Poll.create(req.body, function(err, poll) {
      if (err) {
        console.log(err);
        res.json({
          "status: ": "error"
        });
      } else {
        console.log("successly created poll: ", poll);
        res.json(poll);
      }
    });
  },
  get: function(req, res) {
    Poll.findOne(
      {
        _id: req.params.id
      },
      function(err, poll) {
        if (err) {
          console.log(err);
          res.json({
            "status: ": "error"
          });
        } else {
          console.log("successly retrieved poll: ", poll);
          res.json(poll);
        }
      }
    );
  }
};
