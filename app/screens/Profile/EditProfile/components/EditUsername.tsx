import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../../../../shared/Input/Input";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { IUser } from "../../../../Types/User";

interface EditUsernameProps {
  username: IUser["username"];
  title: React.ReactNode;
}

const EditUsername: React.FC<EditUsernameProps> = ({ username, title }) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  return (
    <>
      {title}
      <Input
        style={styles.inputStyle}
        placeholder="Username"
        defaultValue={`@${username}`}
        onTouchStart={() =>
          navigation.navigate("ProfileNav", {
            screen: "ChangeUsername",
            params: { username: username },
          })
        }
        isValid
        editable={false}
      />
    </>
  );
};

export default EditUsername;

const styles = StyleSheet.create({
  inputStyle: { flex: 1, width: "100%", marginTop: 0 },
});
