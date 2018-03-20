import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCriteriaChange } from "../actions/criteria";

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "1"
    };
  }

  handleSelection = event => {
    const { value, name } = event.target;
    console.log(value);
    this.setState(() => ({
      price: value
    }));
    const { dispatch } = this.props;
    dispatch(
      handleCriteriaChange({
        price: value
      })
    );
  };
  render() {
    const { price } = this.state;
    return (
      <div>
        <h5>Price</h5>
        <div className="price-container">
          <button
            onClick={this.handleSelection}
            value="1"
            name="price"
            style={{
              background: price === "1" ? "#ECECEC" : "none"
            }}
          >
            Any
          </button>
          <button
            onClick={this.handleSelection}
            style={{
              background: price === "2" ? "#ECECEC" : "none"
            }}
            value="2"
            name="price"
          >
            $
          </button>
          <button
            style={{
              background: price === "3" ? "#ECECEC" : "none"
            }}
            onClick={this.handleSelection}
            value="3"
            name="price"
          >
            $$
          </button>
          <button
            style={{
              background: price === "4" ? "#ECECEC" : "none"
            }}
            onClick={this.handleSelection}
            value="4"
            name="price"
          >
            $$$
          </button>
          <button
            style={{
              background: price === "5" ? "#ECECEC" : "none"
            }}
            onClick={this.handleSelection}
            value="5"
            name="price"
          >
            $$$$
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Price);
