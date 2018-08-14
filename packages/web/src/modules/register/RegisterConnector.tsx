import * as React from "react";
import {RegisterView} from "./ui/RegisterView";

export class RegisterConnector extends React.PureComponent {
  dummySubmit = async (values: any) => {
    console.log("====================================");
    console.log("From Register Connector");
    console.log(values);
    console.log("====================================");
    return null;
  };
  render() {
    return <RegisterView submit={this.dummySubmit} />;
  }
}
