import React from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import UserLayout from "../../layout/UserLayout";

import login from "./login";
import register from "../register";
import forgotPassword from "./forgot-password";

const User = ({ match }) => {
  return (
    <UserLayout>
      <Switch>
        <Route path={`/user/login`} component={login} />
        <Route path={`/user/register`} component={register} />
        <Redirect exact from={`/user`} to={`/user/login`} />
        <Redirect to="/error" />
      </Switch>
    </UserLayout>
  );
};

export default withRouter(User);
