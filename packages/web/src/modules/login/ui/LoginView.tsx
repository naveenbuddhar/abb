import * as React from "react";
// import * as Antd from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
// import * as yup from "yup";
import { loginSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";
import { Form as AntForm, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from "@abb/controller";
// const { Form: AntForm, Icon, Button } = Antd;

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: "400", margin: "auto" }}>
          {/* Email field  */}
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />
          {/* Password field */}
          <Field
            name="password"
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            component={InputField}
          />

          <FormItem>
            <Link to="/forgot-password">Forgot Password</Link>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
          </FormItem>
          <FormItem>
            Or <Link to="/register">Register</Link>
          </FormItem>
        </div>
      </Form>
    );
  }
}

// Formik validation and other necessary validation is being called here
// ToDo : Need to look into the Formik Lib to understand better
export const LoginView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: loginSchema,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
