import React, { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Text } from "react-native";
import { colors } from "../../../../src/colors";
import { sameUsernames } from "../../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/sameUsername";
import { text_modifier } from "../../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/text_modifier";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import Input from "../../../../shared/Input/Input";
import { Title } from "../../../../shared/Title/Title";
import EditUserBio from "./EditUserBio";
import { EditUser, IUser } from "../../../../Types/User";
import { isAndroid } from "../../../../src/platform";
import EditUserEmail from "./EditUserEmail";
import CustomAlert from "../../../../shared/Alert/CustomAlert";

interface EditPublicInformationProps {
  user: IUser;
  handleUserEdit: (editedUser: EditUser) => void;
  handleUsernameValidation: (isValid: boolean) => void;
  setShowAlertModal: Dispatch<SetStateAction<boolean>>;
  setErrorMsg: Dispatch<SetStateAction<string | undefined>>;
}

export default function EditPublicInformation({
  user,
  handleUserEdit,
  handleUsernameValidation,
  setShowAlertModal,
  setErrorMsg,
}: EditPublicInformationProps) {
  const [userInfo, setUserInfo] = useState<EditUser>({
    name: user?.name,
    surname: user?.surname,
    username: user?.username,
  });
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  return (
    <View style={{ flex: 1 }}>
      <Title title="Name & Surname" fontStyle={styles.titleStyle} />
      <View style={[styles.nameStyle, styles.containerStyle]}>
        <Input
          style={{ ...styles.inputStyle, marginRight: 5 }}
          placeholder="Name"
          onChangeText={(text) => {
            handleUserEdit({ ...userInfo, name: text });
            setUserInfo({ ...userInfo, name: text });
          }}
          defaultValue={userInfo.name}
          isValid
        />
        <Input
          style={styles.inputStyle}
          placeholder="Surname"
          onChangeText={(text) => {
            handleUserEdit({ ...userInfo, surname: text });
            setUserInfo({ ...userInfo, surname: text });
          }}
          defaultValue={userInfo.surname}
          isValid
        />
      </View>
      <View style={[styles.usernameStyle, styles.containerStyle]}>
        <Title title="Username" fontStyle={styles.titleStyle} />

        <Input
          style={styles.inputStyle}
          onChangeText={(text) => {
            setIsUsernameValid(true);
            setUserInfo({ ...userInfo, username: text_modifier(text) });
          }}
          isValid={isUsernameValid}
          placeholder="Username"
          defaultValue={`@${userInfo.username}`}
          onEndEditing={() => {
            sameUsernames(text_modifier(userInfo.username), setErrorMsg)
              .then(() => {
                handleUserEdit({ ...userInfo, username: userInfo.username });
                handleUsernameValidation(true);
              })
              .catch((err) => {
                if (userInfo.username !== `${user.username}`) {
                  setIsUsernameValid(false);
                  setShowAlertModal(true);
                  handleUsernameValidation(false);
                }
              });
          }}
        />
      </View>

      <View style={styles.containerStyle}>
        <Title title="Bio" fontStyle={styles.titleStyle} />
        <EditUserBio userBio={user.bio} />
      </View>

      <View>
        <Title title="Email" fontStyle={styles.titleStyle} />
        <EditUserEmail email={user.email!} />
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
  titleStyle: {
    fontSize: 18,
    color: colors.text_2,
    fontFamily: FontFamily.regular,
  },
  inputStyle: { flex: 1, marginTop: 0 },
  nameStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerStyle: {
    marginBottom: "5%",
  },
  usernameStyle: {},
  usernameContainer: {
    width: "70%",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
