import * as React from "react";
import { RegisterController } from "@abb/controller";
import { RegisterView } from "./ui/RegisterView";

// Container -> View
// Container -> Connector -> View
// Controller- > Connector -> View
export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
