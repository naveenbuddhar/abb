import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import {
  SendForgotPasswordEmailMutation,
  SendForgotPasswordEmailMutationVariables
} from "./schemaTypes.ts/SendForgotPasswordEmailMutation";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (
    data: {
      submit: (
        values: SendForgotPasswordEmailMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    SendForgotPasswordEmailMutation,
    SendForgotPasswordEmailMutationVariables
  >
> {
  submit = async (values: SendForgotPasswordEmailMutationVariables) => {
    console.log(values);
    const response = await this.props.mutate({
      variables: values
    });
    console.log("Response:", response);

    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation SendForgotPasswordEmailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const ForgotPasswordController = graphql<
  Props,
  SendForgotPasswordEmailMutation,
  SendForgotPasswordEmailMutationVariables
>(forgotPasswordMutation)(C);
