import React, { Component } from "react";
import { connect } from "react-redux";
import Meal from "./Meal";
import Type from "./Type";
import Price from "./Price";
import Location from "./Location";

class New extends Component {
  render() {
    return (
      <div className="container">
        <Meal />
        <div className="col-md-1" />
        <div className="row">
          <div className="col-md-5">
            <Price />
          </div>
          <div className="col-md-5">
            <Location />
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    );
  }
}

export default connect()(New);
