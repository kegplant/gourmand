import React, { Component } from "react";
import { connect } from "react-redux";
import Meal from "./Meal";
import Type from "./Type";
import Price from "./Price";
import Location from "./Location";
import { handleCriteriaChange } from "../actions/shared";
import Result from "./Result";
import Details from "./Details";

class New extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      handleCriteriaChange({
        address: "566 Arguello Way",
        location: "3",
        meal: 2,
        price: "1"
      })
    );
  }
  render() {
    return (
      <div className="container">
        <Meal />

        <div className="row">
          <div className="col-md-6">
            <Price />
          </div>
          <div className="col-md-6">
            <Location />
          </div>
        </div>
        <Result />
        <Details />
      </div>
    );
  }
}

export default connect()(New);
