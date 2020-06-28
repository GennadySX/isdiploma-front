import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { isMultiColorActive } from "./constants/defaultValues";
import main from "./views";
import app from "./views/app";
import user from "./views/user";
import error from "./views/error";

const token = localStorage.getItem('token')


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ioSocket:  null,

            token: token
        }
    }

  render() {
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Router>
              <Switch>
                <Route path="/home" component={app} />
                <Route path="/user" component={user} />
                <Route path="/error" exact component={error} />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({  settings }) => {
  const { locale } = settings;
  return {  locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
