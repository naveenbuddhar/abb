import * as React from "react";
// import * as Antd from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
// import * as yup from "yup";
import { InputField } from "../../shared/InputField";
import { Form as AntForm, Icon, Button } from "antd";
import { NormalizedErrorMap } from "@abb/controller";
import { changePasswordschema } from "@abb/common";
// const { Form: AntForm, Icon, Button } = Antd;

const FormItem = AntForm.Item;

interface FormValues {
  newPassword: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: "400", margin: "auto" }}>
          {/* Password field  */}
          <Field
            name="newPassword"
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="New Password"
            component={InputField}
          />
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change Password
            </Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

// Formik validation and other necessary validation is being called here
// ToDo : Need to look into the Formik Lib to understand better
export const ChangePasswordView = withFormik<Props, FormValues>({
  validationSchema: changePasswordschema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
