import React from "react";

import { Alert, View } from "react-native";
import Button from "./Button";
import { auth } from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";
import { IUser } from "../../../Types/User";
import { colors } from "../../../src/colors";

const CurrentUserButtons = ({ user }: { user: IUser }) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  const onPress = () => {
    navigation.navigate("ProfileNav", {
      screen: "EditProfile",
      params: {
        current_user: user,
      },
    });
  };
  return user.uid === auth.currentUser?.uid ? (
    <>
      <Button
        onPress={async () => {
          Alert.alert("Are you sure?", "", [
            {
              text: "Log out",
              onPress: async () => await auth.signOut(),
              style: "destructive",
            },
            { text: "Cancel", onPress: () => {}, style: "default" },
          ]);
        }}
        text={"Log out"}
      />
      <View>
        <Button onPress={onPress} text="Edit" />
      </View>
    </>
  ) : (
    <Button
      onPress={() => {}}
      text={"Follow"}
      style={{ backgroundColor: colors.doneButtonBG }}
      textStyled={{ color: colors.doneButtonText }}
    />
  );
};

export default CurrentUserButtons;
