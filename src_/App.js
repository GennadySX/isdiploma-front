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

const AuthRoute = ({ component: Component, authUser,  client, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props}  client={client}/>
      ) : (
        <Redirect
          to={{
              client: client,
            pathname: "/auth/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

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
                <AuthRoute path="/home" authUser={loginUser} component={app} client={this.state.ioSocket} />
                <Route path="/auth" component={user} />
                <Route path="/error" exact component={error} />
                <Route path="/" exact component={main} />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);