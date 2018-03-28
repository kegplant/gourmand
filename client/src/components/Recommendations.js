import React, { Component } from "react";
import { connect } from "react-redux";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";
import { addChoice } from "../actions/choice";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }

  handleRecClicked = (event, id) => {
    const { dispatch } = this.props;
    dispatch(addChoice(id));
  };

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
    const { recommendations, choice } = this.props;
    const starsArray = this.getStarsArray(recommendations);
    return (
      <div className="rec-container">
        <h5>Your group's recommendations</h5>
        {recommendations.map((rec, index) => {
          return (
            <div
              className="recommendation"
              key={rec.id}
              onClick={e => this.handleRecClicked(e, index)}
              style={{
                border: choice === index ? "4px solid #ff4f00" : null
              }}
            >
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
        <button className="btn btn-success">Share Selection</button>
      </div>
    );
  }
}

function mapStateToProps({ recommendations, choice }) {
  const currentChoice = choice.hasOwnProperty("choice") ? choice.choice : null;
  return {
    recommendations,
    choice: currentChoice
  };
}

export default connect(mapStateToProps)(Recommendations);
