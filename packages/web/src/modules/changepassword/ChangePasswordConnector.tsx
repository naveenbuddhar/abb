import * as React from "react";
import { ChangePasswordView } from "../changepassword/ui/ChangePasswordView";
import { RouteComponentProps } from "react-router-dom";
import { ChangePasswordController } from "@abb/controller";

export class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{
    key: string;
  }>
> {
  submit = async (values: any) => {
    console.log("====================================");
    console.log(values);
    console.log("====================================");
    return null;
  };

  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;
    console.log("====================================");
    console.log(key);
    console.log("====================================");
    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePasswordView // tslint:disable-next-line:jsx-no-lambda
            submit={async ({ newPassword }) =>
              submit({
                key,
                newPassword
              })
            }
          />
        )}
      </ChangePasswordController>
    );
  }
}
