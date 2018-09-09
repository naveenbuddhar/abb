import * as React from "react";
// import { Button } from "react-native-elements";
// import { StyleSheet, Text, View } from "react-native";
import { RegisterView } from "./ui/RegisterView";
import { RegisterController } from "@abb/controller";

export class RegisterConnector extends React.PureComponent {
  // onSubmit = async (values: any) => {
  //   console.log("========================================");
  //   console.log(values);
  //   console.log("========================================");
  //   return null;
  // };
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );

    //<Button title="BUTTON" onPress={this.onPress} />;
    // <View style={styles.container}>
    //   <Text>Hello!!!</Text>
    // </View>
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
