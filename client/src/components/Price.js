import React, { Component } from "react";
import { connect } from "react-redux";

class Price extends Component {
  render() {
    return (
      <div>
        <h5>Price</h5>
        <div className="price-container">
          <button>Any</button>
          <button>$</button>
          <button>$$</button>
          <button>$$$</button>
          <button>$$$</button>
        </div>
      </div>
    );
  }
}

export default Price;
