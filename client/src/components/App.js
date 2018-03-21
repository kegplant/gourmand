import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import New from "./New";
import Poll from "./Poll";
import LoadingBar from "react-redux-loading";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { addSocketID } from "../actions/socket";

class App extends Component {
  componentDidMount() {
    const socket = socketIOClient("http://localhost:8000");
    socket.on("server_response", data => {
      const { dispatch } = this.props;
      dispatch(addSocketID(data.response));
    });
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={New} />
            <Route exact path="/:id" component={Poll} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect()(App);
