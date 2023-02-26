import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import User from "./HeaderComponent/User";

export default function Header({ user, isLoading }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{}}>
      {/* <ContainerBG image={user.userImage} insets={insets}> */}
      <User user={user} />
      {/* </ContainerBG> */}
    </View>
  );
}
const styles = StyleSheet.create({});
