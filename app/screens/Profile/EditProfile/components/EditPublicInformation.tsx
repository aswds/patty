import React, { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Text } from "react-native";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import Input from "../../../../shared/Input/Input";
import { Title } from "../../../../shared/Title/Title";
import EditUserBio from "./EditUserBio";
import { EditUser, IUser } from "../../../../Types/User";
import EditUserEmail from "./EditUserEmail";
import CustomAlert from "../../../../shared/Alert/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
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
}: EditPublicInformationProps) {
  const [isValid, setIsValid] = useState({
    name: true,
    surname: true,
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  function hideModal() {
    setShowModal(false);
  }

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
              if (!isValid.name) setIsValid({ ...isValid, name: true });

              handleUserEdit({ ...user, name: text });
            }}
            onEndEditing={() => {
              if (user.name?.length == 0) {
                setIsValid({ ...isValid, name: false });
                setShowModal(true);
              }
            }}
            defaultValue={user.name}
            autoCapitalize="sentences"
            isValid={isValid.name}
          />
          <Input
            style={styles.inputStyle}
            placeholder="Surname"
            onChangeText={(text) => {
              if (!isValid.surname) setIsValid({ ...isValid, surname: true });
              handleUserEdit({ ...user, surname: text });
            }}
            onEndEditing={() => {
              if (user.surname?.length == 0) {
                setIsValid({ ...isValid, surname: false });
                setShowModal(true);
              }
            }}
            autoCapitalize="sentences"
            defaultValue={user.surname}
            isValid={isValid.surname}
          />
        </View>
      </View>
      <View style={[styles.containerStyle]}>
        <EditUsername
          username={user.username}
          title={<Title title="Username" fontStyle={styles.titleStyle} />}
        />
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
      <CustomAlert
        title="Required Fields Missing"
        showModal={showModal}
        errorMsg="Name and surname fields cannot be left empty."
        hideModal={hideModal}
      />
    </View>
  );
}
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
