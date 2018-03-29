import React, { Component } from "react";
import { connect } from "react-redux";
import { addDetails } from "../actions/details";
import { handleCreatePoll } from "../actions/shared";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      event: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      const { history } = this.props;
      const { event } = this.state;
      const url = `/${event}/${nextProps.id}`;
      history.push(url);
    }
  }

  isDisabled = () => {
    return !this.props.selected;
  };

  handleCreatePollClicked = e => {
    let { name, event } = this.state;
    const { dispatch } = this.props;

    if (name === "") {
      this.setState(() => ({
        name: "gourmand-user"
      }));
    }
    if (event === "") {
      this.setState(() => ({
        event: "my_event"
      }));
    }

    dispatch(
      addDetails({
        name,
        event
      })
    );

    localStorage.setItem("originator", true);

    dispatch(handleCreatePoll());
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value
    }));
  };
  render() {
    return (
      <div className="details">
        <div className="row">
          <div className="col-md-6">
            <div>
              <h5>Event Details (optional)</h5>
              <div className="info-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name (optional)"
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  name="event"
                  placeholder="Event name (optional)"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h5>Create poll</h5>
              <div className="info-container">
                <button
                  className="poll-buttons"
                  onClick={this.handleCreatePollClicked}
                  disabled={this.isDisabled()}
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ socket, mongo, selection }) {
  const { socketID } = socket;
  const selected = Object.keys(selection).length <= 1 ? false : true;

  const { id } = mongo;
  return {
    socketID,
    id,
    selected
  };
}

export default connect(mapStateToProps)(Details);
