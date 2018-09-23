import * as React from "react";
// import { Button } from "react-native-elements";
// import { StyleSheet, Text, View } from "react-native";
import { SecureStore } from "expo";
import { LoginView } from "./ui/LoginView";
import { LoginController } from "@abb/controller";
import { SID_KEY } from "../shared/constants";

export class LoginConnector extends React.PureComponent {
  saveSessionId = (sid: string) => {
    SecureStore.setItemAsync(SID_KEY, sid);
  };
  render() {
    return (
      <LoginController onSessionId={this.saveSessionId}>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
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
