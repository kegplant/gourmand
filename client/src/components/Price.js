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
    return (
      <div>
        <h5>Price</h5>
        <div className="price-container">
          <button onClick={this.handleSelection} value="1" name="price">
            Any
          </button>
          <button onClick={this.handleSelection} value="2" name="price">
            $
          </button>
          <button onClick={this.handleSelection} value="3" name="price">
            $$
          </button>
          <button onClick={this.handleSelection} value="4" name="price">
            $$$
          </button>
          <button onClick={this.handleSelection} value="5" name="price">
            $$$$
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Price);
