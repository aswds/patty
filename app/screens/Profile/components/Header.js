import { BlurView } from "expo-blur";
import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ContainerBG from "./HeaderComponent/ContainerBG";

import User from "./HeaderComponent/User";
import Followers from "./Follower_info";
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
