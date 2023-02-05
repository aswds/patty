import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
import Container from "./EmailVerification/Container";
import VerifyText from "./EmailVerification/VerifyText";
import Verify from "./EmailVerification/Verify";

export default function EmailVerification(props) {
  const { email } = props;
  return (
    <Container>
      <VerifyText styles={styles} />
      <Verify email={props.email} />
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 20,
    color: colors.buttonTextColor,
  },
});
