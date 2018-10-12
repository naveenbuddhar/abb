import * as React from "react";
import { RegisterController } from "@abb/controller";
import { RegisterView } from "./ui/RegisterView";
import { RouteComponentProps } from "react-router-dom";

// Container -> View
// Container -> Connector -> View
// Controller- > Connector -> View
export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/confirm-email", {
      message: "Please Confirm your email to activate the account"
    });
  };

  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => (
          <RegisterView onFinish={this.onFinish} submit={submit} />
        )}
      </RegisterController>
    );
  }
}
