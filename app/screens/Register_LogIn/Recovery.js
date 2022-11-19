import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import forgotPassword from "../../components/forgotPassword";
import { KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StyledButton from "./components/button";
import { colors } from "../../src/colors";
import { Input } from "./components/Input";

const DataRecovery = (props) => {
  const [userEmail, setUserEmail] = useState("");
  return (
    <View
      style={{
        flex: 1,
        width: null,
        height: null,
        backgroundColor: colors.background,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
            <View style={{}}>
              <Text
                style={{ fontSize: 20, alignSelf: "center", color: "white" }}
              >
                Reset your password
              </Text>
            </View>
            <View style={styles.rContainer}>
              <Input isValid={true}>
                <MaterialIcons
                  name="alternate-email"
                  size={Dimensions.get("window").height >= 800 ? 24 : 20}
                  color={colors.iconColor}
                />
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.inputField}
                  placeholderTextColor={"grey"}
                  placeholder="Email"
                  onChangeText={(text) => setUserEmail(text)}
                  defaultValue={userEmail}
                />
              </Input>
              <View style={styles.shadowButton}>
                <StyledButton
                  style={{
                    ...styles.shadowButton,
                    marginTop: 30,
                    width: "100%",
                    borderRadius: 10,
                    elevation: 5,
                  }}
                  onPress={() => {
                    forgotPassword(userEmail);
                  }}
                  textStyle={{ color: "white" }}
                >
                  Submit
                </StyledButton>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  shadowButton: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 7,
      width: 0,
    },
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 13,
    backgroundColor: "rgba(155 , 50, 50 , 1)",
    height: Dimensions.get("window").height / 14,
    width: Dimensions.get("window").width / 1.2,
    alignSelf: "center",
  },
  inputField: {
    width: Dimensions.get("window").width / 2.1,
    height: Dimensions.get("window").height / 13,
    justifyContent: "center",
    borderRadius: 20,
  },
  rContainer: {
    height: "30%",
    width: "100%",
    alignItems: "center",
  },
  userInput: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: "30%",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 13,
    justifyContent: "flex-start",
    paddingLeft: 10,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default DataRecovery;
