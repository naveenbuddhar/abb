import * as React from "react";
import { Form, Icon, Input, Button } from "antd";
import { withFormik, FormikErrors, FormikProps } from "formik";
// import * as yup from "yup";

import { validUserSchema } from "@abb/common";

const FormItem = Form.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
      errors
    } = this.props;
    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: "400", margin: "auto" }}>
          <FormItem
            help={
              touched.email && errors.email ? errors.email : "" // tslint:disable-next-line:jsx-no-multiline-js
            } // tslint:disable-next-line:jsx-no-multiline-js
            validateStatus={touched.email && errors.email ? "error" : undefined}
          >
            <Input
              name="email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            help={
              touched.password && errors.password ? errors.password : "" // tslint:disable-next-line:jsx-no-multiline-js
            }
            validateStatus={
              touched.password && errors.password ? "error" : undefined // tslint:disable-next-line:jsx-no-multiline-js
            }
          >
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </FormItem>
          <FormItem>
            Or <a href="">Login now!</a>
          </FormItem>
        </div>
      </form>
    );
  }
}

// Formik validation and other necessary validation is being called here
// ToDo : Need to look into the Formik Lib to understand better
export const RegisterView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: validUserSchema,
  validateOnBlur: false,
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
