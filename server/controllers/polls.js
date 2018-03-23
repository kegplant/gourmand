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
    Poll.create(req.body, (err, poll) => {
      if (err) {
        errHandler(err, res);
      } else {
        console.log("successly created poll_id: ", poll._id);
        res.json(poll);
      }
    });
  },
  get: function(req, res) {
    Poll.findOne(
      {
        _id: req.params.id
      },
      (err, poll) => {
        if (err) {
          errHandler(err, res);
        } else {
          console.log("successly retrieved poll_id: ", poll_id);
          res.json(poll);
        }
      }
    );
  },
  update: function(req, res) {
    Poll.findOne(
      {
        _id: req.body.pollID
      },
      (err, poll) => {
        if (err) errHandler(err, res);
        updateVote(poll, req.body.selected);
        poll.save((err) => {
          if (err) errHandler(err, res);
          console.log("successly saved vote to ", req.body.selected, "poll_id: ", poll._id);
          res.json(poll);
        });
      }
    );
  }
};

function errHandler(err, res) {
  console.log(err);
  res.json({
    "status: ": err
  });
}

function updateVote(poll, selected) { //find the selected category in poll and add its vote by 1
  poll.selections.forEach(selection => { //could try early exit
    if (selection.category == selected) selection.votes.number += 1;
  });
}
