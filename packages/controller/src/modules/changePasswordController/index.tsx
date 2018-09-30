import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import {
  ForgotPasswordChangeMutationVariables,
  ForgotPasswordChangeMutation
} from "./schemaTypes.ts/ForgotPasswordChangeMutation";
import { normalizedError } from "../util/normalizedError";

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (
    data: {
      submit: (
        values: ForgotPasswordChangeMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    ForgotPasswordChangeMutation,
    ForgotPasswordChangeMutationVariables
  >
> {
  submit = async (values: ForgotPasswordChangeMutationVariables) => {
    console.log(values);
    const {
      data: { forgotPasswordChange }
    } = await this.props.mutate({
      variables: values
    });
    console.log("Response", forgotPasswordChange);

    if (forgotPasswordChange) {
      return normalizedError(forgotPasswordChange);
    }

    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordChangeMutation = gql`
  mutation ForgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

export const ChangePasswordController = graphql<
  Props,
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
>(forgotPasswordChangeMutation)(C);
