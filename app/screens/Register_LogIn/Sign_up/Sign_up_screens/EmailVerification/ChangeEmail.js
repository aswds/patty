import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../../src/colors";
import Button from "../../../components/button";
import Input from "../../../../../shared/Input/Input";
import { textStyle } from "../../../style";
import Container from "./Container";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

export default function ChangeEmail() {
  const route = useRoute();
  const [Email, setEmail] = React.useState(route.params?.email);
  return (
    <>
      <Container>
        <View
          style={{
            height: Dimensions.get("window").height / 2,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Change your email</Text>
          </View>
          <Input
            style={styles.inputStyle}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={Dimensions.get("window").height >= 800 ? 24 : 20}
                color={colors.iconColor}
              />
            }
            isValid={true}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={textStyle.color}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={Email}
            inputStyle={styles.inputField}
          />

          <Button
            style={{
              ...styles.shadowButton,

              borderRadius: 10,
              elevation: 5,
            }}
            onPress={() => {}}
            textStyle={{ color: "white" }}
          >
            Submit
          </Button>
        </View>
      </Container>
    </>
  );
}
const styles = StyleSheet.create({
  inputStyle: { width: "90%", height: "15%" },
  inputField: {
    color: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  textContainer: {},
  textStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: colors.text,
  },
  shadowButton: {
    width: "90%",
    marginTop: 20,
    borderRadius: 13,
    backgroundColor: colors.accentColor,
    height: "15%",
    alignSelf: "center",
  },
});
