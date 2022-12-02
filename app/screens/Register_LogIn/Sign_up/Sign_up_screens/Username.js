import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import NMAskName from "./components/NameModalComp/NMAskName";
import NMNextButton from "./components/NameModalComp/NMNextButton";
import { NMScreen } from "./components/NameModalComp/NMScreen";
import AskUsername from "./components/Username/AskUsername";
import NextButton from "./components/Username/NextButton";
import { sameUsernames } from "./Sign_up_Functions/sameUsername";
export const Username = (props) => {
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [isDisabled, setIsDisabled] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const surname_input_ref = useRef();
  return (
    <NMScreen>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <AskUsername />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Input isValid={true} style={{ width: "90%" }}>
            <TextInput
              style={styles.textInput}
              placeholder="username"
              placeholderTextColor={colors.iconColor}
              onChangeText={(text) => {
                setUsername(
                  text.replace(" ", "_").replace(/[^a-zA-Z_0-9-]/g, "")
                );
                sameUsernames(
                  text.replace(" ", "_").replace(/[^a-zA-Z_0-9-]/g, ""),
                  setErrorMsg
                )
                  .then((res) => setIsDisabled(!res))
                  .catch((err) => {
                    setIsDisabled(!err);
                  });
              }}
              value={username}
              autoCorrect={false}
              autoCapitalize={false}
              autoFocus
            />
          </Input>
        </View>
        <NextButton
          navigation={navigation}
          disabled={isDisabled}
          errorMsg={errorMsg}
          name={route.params?.name}
          surname={route.params?.surname}
          username={username}
        />
      </View>
    </NMScreen>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "WorkSans-Bold",
    fontSize: 35,
    color: colors.buttonTextColor,
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: "WorkSans-Bold",
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
  nextButtonContainer: {
    width: "40%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 40,
  },
  nextButtonText: {
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
  container: {
    flex: 1,
  },
});
