import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class TypePage extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    const {
      location: { state }
    } = this.props;
    return <h1>{state && state.message ? state.message : "Hello"} </h1>;
  }
}
