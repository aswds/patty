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
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { Screen } from "../../../../shared/Screen/Screen";
import EditUsername from "./EditUsername";
interface EditPublicInformationProps {
  user: EditUser;
  handleUserEdit: (editedUser: EditUser) => void;
  setShowAlertModal: Dispatch<SetStateAction<boolean>>;
  setErrorMsg: Dispatch<SetStateAction<string | undefined>>;
}

export default function EditPublicInformation({
  user,
  handleUserEdit,
  setShowAlertModal,
  setErrorMsg,
}: EditPublicInformationProps) {
  const [username, setUsername] = useState(user.username);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const navigation = useNavigation<ProfileNavigationProps>();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.name_surnameContainer}>
        <Title title="Name & Surname" fontStyle={styles.titleStyle} />
        <View style={[styles.nameStyle, styles.containerStyle]}>
          <Input
            style={{ ...styles.inputStyle, marginRight: 5 }}
            placeholder="Name"
            onChangeText={(text) => {
              handleUserEdit({ ...user, name: text });
            }}
            defaultValue={user.name}
            isValid
          />
          <Input
            style={styles.inputStyle}
            placeholder="Surname"
            onChangeText={(text) => {
              handleUserEdit({ ...user, surname: text });
            }}
            defaultValue={user.surname}
            isValid
          />
        </View>
      </View>
      <View style={[styles.containerStyle]}>
        <EditUsername username={user.username} title={
        <Title title="Username" fontStyle={styles.titleStyle} />

        }/>
      </View>

      <EditUserBio
        userBio={user.bio}
        onPress={() => {
          navigation.navigate("ProfileNav", {
            screen: "ChangeBio",
            params: {
              bio: user.bio,
            },
          });
        }}
        title={<Title title="Bio" fontStyle={styles.titleStyle} />}
      />

      <EditUserEmail
        email={user.email!}
        title={<Title title="Email" fontStyle={styles.titleStyle} />}
      />
    </View>
  );
}
// style={[
//     styles.textStyle,
//     { color: colors.iconColor, fontSize: 14 },
//   ]}
const styles = StyleSheet.create({
  name_surnameContainer: {},
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
});
