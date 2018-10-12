import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { LoginView } from "./ui/LoginView";
import { LoginController } from "@abb/controller";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
