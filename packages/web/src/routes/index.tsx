import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as React from "react";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/forgotpassword/ForgotPasswordConnector";
import { ChangePasswordConnector } from "../modules/changepassword/ChangePasswordConnector";
import { TypePage } from "../modules/TypePage/index";
import { AuthRoute } from "@abb/controller";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";

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
      <Route
        exact={true}
        path="/change-password/:key"
        component={ChangePasswordConnector}
      />
      <Route path="/m" component={TypePage} />
      <AuthRoute path="/create-listing" component={CreateListingConnector} />
    </Switch>
  </BrowserRouter>
);
