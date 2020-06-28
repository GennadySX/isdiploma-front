import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "../../layout/AppLayout";
import ProfilePage from "../user/profile";
import SurveyApp from "./applications/survey";
import TaskApp from "./applications/task";
import Chat from "./applications/chat";
import openSocket from "socket.io-client";
import {Api} from "../../constants/API";


const HomeRouter = ({match, state}) => (
    <div className="dashboard-wrapper">
    </div>
)

const token = localStorage.getItem('token')
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      token: token
    }

    this.socket = token ? openSocket(Api.ws, {
      query: {
        token: token
      },
      transports: ['websocket']
    }) : null
  }


  render() {

    if (localStorage.getItem('token') <= 0) {
      window.location.href = '/user/login'
    }

    return (
      <AppLayout>
        <Switch>
          <Route path={`/home/chat`} component={() => <Chat {...this.props} client={this.socket} />} params={this.state} />
          <Route path={`/home/project`} component={() => <SurveyApp {...this.props} client={this.socket} />} isExact/>
          <Route path={`/home/task`} component={() => <TaskApp {...this.props} client={this.socket} />} isExact/>
          <Route path={`/home/profile`} component={ProfilePage} />
          <Redirect from={'/'} to="/home/chat" />
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

export default withRouter(App
);
