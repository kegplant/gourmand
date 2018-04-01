import React, { Component } from "react";
import { connect } from "react-redux";
import { getStarsArray } from "../utils/helpers";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";
import { buildCategoriesString } from "../utils/helpers";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

class Choice extends Component {
  render() {
    const { choice } = this.props;
    const starsArray = getStarsArray([choice]);
    const location = `${choice.location.address1} ${choice.location.city}, ${
      choice.location.state
    }`;
    const categories = buildCategoriesString(choice.categories);
    const phoneUtil = PhoneNumberUtil.getInstance();
    const PNF = PhoneNumberFormat;
    const number = phoneUtil.parseAndKeepRawInput(choice.phone);
    const phoneNumber = phoneUtil.format(number, PNF.NATIONAL);
    return (
      <div>
        <h5>The organizer has selected a restaurant. Let's eat.</h5>
        <div className="card">
          <img
            className="card-img-top"
            src={choice.image_url}
            alt="Card image cap"
          />
          <div className="card-body">
            <div className="card-title">
              <div class="row">
                <p className="rec-name">{choice.name} </p>
                <div className="row stars-container">
                  {starsArray[0].map((element, idx) => {
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
            <div className="card-text">
              <div className="row">
                <p className="card-body-header">Restaurant Type(s):</p>
                <p>{categories}</p>
              </div>
              <div className="row">
                <p className="card-body-header">Address:</p>
                <p>{location}</p>
              </div>
              <div className="row">
                <p className="card-body-header">Phone:</p>
                <p>{phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ choice }) {
  return {
    choice
  };
}

export default connect(mapStateToProps)(Choice);
