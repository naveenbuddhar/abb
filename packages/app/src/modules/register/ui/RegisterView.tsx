import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
// import * as yup from "yup";
import { validUserSchema } from "@abb/common";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center"
        }}
      >
        {/* Email field  */}
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}> Register </Text>
          <Field
            name="email"
            placeholder="Email"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />
          {/* Password field */}
          <Field
            name="password"
            secureTextEntry={true}
            placeholder="Password"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />

          <Button
            style={{ marginTop: 10 }}
            title="Submit"
            onPress={handleSubmit as any}
          />
        </Card>
      </View>
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
