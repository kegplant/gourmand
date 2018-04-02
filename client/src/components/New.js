import React, { Component } from "react";
import { connect } from "react-redux";
import Meal from "./Meal";
import Price from "./Price";
import Location from "./Location";
import { handleCriteriaChange } from "../actions/shared";
import Result from "./Result";
import Details from "./Details";
import None from "./None";
import { handleGetGeolocation, addLongLat } from "../actions/location";

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

    if ("geolocation" in navigator) {
      dispatch(handleGetGeolocation());
    }

    if (localStorage.getItem("latitude")) {
      const latitude = localStorage.getItem("latitude");
      const longitude = localStorage.getItem("longitude");
      dispatch(addLongLat(latitude, longitude));
    }
  }

  render() {
    const { loading, history } = this.props;
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
        {loading ? <Result /> : <None />}
        <Details history={history} />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  const loading =
    Object.keys(categories).length === 0 && categories.constructor === Object
      ? false
      : true;
  return {
    loading
  };
}

export default connect(mapStateToProps)(New);
