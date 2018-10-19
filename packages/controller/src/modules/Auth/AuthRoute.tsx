import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import gql from "graphql-tag";
import { RouteProps, Route, Redirect, RouteComponentProps } from "react-router";
import { MeQuery } from "./schemaTypes.ts/MeQuery";

type props = RouteProps;

class C extends React.PureComponent<ChildProps<props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return <Redirect to="/login" />;
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

export const AuthRoute = graphql<props, MeQuery>(meQuery)(C);
