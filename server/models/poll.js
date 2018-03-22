//////////////////////////////////////////////////////////////////////////
//  SERVER/MODELS/MODEL_NAME_SINGULAR.JS FILE [ SCHEMA / MODEL]
//////////////////////////////////////////////////////////////////////////
// Require Mongoose module (STEP 1) in the following files:
// - mongoose.js file,
// - CONTROLLER file,
// - HERE.
//////////////////////////////////////////////////////////////////////////

// STEP 1 (DB/SCHEMA SETUP):
// Require Mongoose module:
var mongoose = require("mongoose");

// STEP 3 (DB/SCHEMA SETUP):
// Name & Describe Schema:
var pollSchema = new mongoose.Schema({
  //<--- SET MODEL NAME & DESCRIBE MODEL'S SCHEMA
  criteria: {
    address: String,
    location: String,
    meal: Number,
    price: String
  },
  selections: [
    {
      category: String,
      number: Number,
      image: String,
      votes: {
        number: Number,
        voters: [String]
      }
    }
  ]
});

// Set this Schema in our Models as 'Schema_Instance':
mongoose.model("Poll", pollSchema); //<-- NAME YOUR MODEL INSTANCE
