import React, { Component } from "react";
import { connect } from "react-redux";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";

class Recommendations extends Component {
  getStarsArray = recommendations => {
    const result = recommendations.map(restaurant => {
      const num = Math.floor(restaurant.rating);
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push("Star");
      }

      if (restaurant.rating !== num) {
        arr.push("Half");
      }
      return arr;
    });

    return result;
  };

  render() {
    const { recommendations } = this.props;
    const starsArray = this.getStarsArray(recommendations);
    return (
      <div>
        <h5>Your group's recommendations</h5>
        {recommendations.map((rec, index) => {
          return (
            <div className="recommendation" key={rec.id}>
              <div className="row rec-title">
                <p className="rec-name">{rec.name} </p>
                <div className="row stars-container">
                  {starsArray[index].map((element, idx) => {
                    return (
                      <div key={idx}>
                        {element === "Star" ? (
                          <FaStar size={24} style={{ color: "tomato" }} />
                        ) : (
                          <FaStarHalfEmpty
                            size={24}
                            style={{ color: "tomato" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
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
