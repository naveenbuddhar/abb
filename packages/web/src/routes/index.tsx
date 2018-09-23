import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as React from "react";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/forgotpassword/ForgotPasswordConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/Login" component={LoginConnector} />
      <Route
        exact={true}
        path="/forgot-password"
        component={ForgotPasswordConnector}
      />
    </Switch>
  </BrowserRouter>
);
