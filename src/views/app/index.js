import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import dashboards from "./dashboards";
import pages from "./pages";
import applications from "./applications";
import ui from "./ui";
import menu from "./menu";
import blankPage from "./blank-page";
import ProfilePage from "../user/profile";

const token = localStorage.getItem('token')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { match } = this.props;

    if (localStorage.getItem('token') <= 0) {
      window.location.href = '/user/login'
    }
    return (
      <AppLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/applications/chat`} />
          <Route path={`${match.url}/dashboards`} component={dashboards} />
          <Route path={`${match.url}/applications`} component={applications}/>
          <Route path={`${match.url}/pages`} component={pages} />
          <Route path={`${match.url}/ui`} component={ui} />
          <Route path={`${match.url}/menu`} component={menu} />
          <Route path={`${match.url}/profile`} component={ProfilePage} />
          <Route path={`${match.url}/blank-page`} component={blankPage} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
