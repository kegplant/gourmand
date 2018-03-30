import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import New from "./New";
import Poll from "./Poll";
import Recommendation from "./Recommendations";
import LoadingBar from "react-redux-loading";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <LoadingBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={New} />
            <Route exact path="/:name/:id" component={Poll} />
            <Route
              exact
              path="/recommendation/:name/:id"
              component={Recommendation}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect()(App);
