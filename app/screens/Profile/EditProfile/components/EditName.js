import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import { sameUsernames } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/sameUsername";
import { text_modifier } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/text_modifier";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export default function EditName({ user }) {
  const [userInfo, setUserInfo] = useState({
    name: user?.name,
    surname: user?.surname,
    username: user?.username,
  });
  const [errorMsg, setErrorMsg] = useState();
  return (
    <View style={{}}>
      <View>
        <View style={styles.nameStyle}>
          <TextInput
            keyboardAppearance={"dark"}
            style={styles.textStyle}
            placeholder=""
            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            defaultValue={userInfo.name}
          />
          <TextInput
            keyboardAppearance={"dark"}
            style={styles.textStyle}
            placeholder=""
            onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
            defaultValue={userInfo.surname}
          />
        </View>
        <View style={styles.usernameStyle}>
          <TextInput
            keyboardAppearance={"dark"}
            style={[
              styles.textStyle,
              { color: colors.iconColor, fontSize: 14 },
            ]}
            onChangeText={(text) => {
              sameUsernames(text_modifier(text), setErrorMsg)
                .then((res) => {})
                .catch((err) => {});
              setUserInfo({ ...userInfo, username: text_modifier(text) });
            }}
            placeholder=""
            defaultValue={`@${userInfo.username}`}
          />
        </View>
      </View>
    </View>
  );
}
// style={[
//     styles.textStyle,
//     { color: colors.iconColor, fontSize: 14 },
//   ]}
const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontFamily: FontFamily.bold,
    fontSize: 18,
    marginHorizontal: "1%",
  },
  nameStyle: {
    flexDirection: "row",
  },
  usernameStyle: {
    marginVertical: "1%",
    marginBottom: "4%",
  },
  usernameContainer: {
    width: "70%",
    backgroundColor: "green",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
