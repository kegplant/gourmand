import React, { Component } from "react";
import { connect } from "react-redux";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";

class Recommendations extends Component {
  render() {
    const { recommendations } = this.props;
    return (
      <div>
        <h5>Your group's recommendations</h5>
        {recommendations.map(rec => {
          return (
            <div className="recommendation" key={rec.id}>
              <div className="row rec-title">
                <p>{rec.name} </p>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfEmpty />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ recommendations }) {
  console.log(recommendations);
  return {
    recommendations
  };
}

export default connect(mapStateToProps)(Recommendations);
