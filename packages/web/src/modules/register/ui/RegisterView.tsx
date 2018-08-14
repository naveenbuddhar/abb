import * as React from "react";
import * as Antd from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
// import * as yup from "yup";
import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";
const { Form: AntForm, Icon, Button } = Antd;

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
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
            Or <a href="">Login now</a>
          </FormItem>
        </div>
      </Form>
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
