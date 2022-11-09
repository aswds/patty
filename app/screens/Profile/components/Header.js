import { BlurView } from "expo-blur";
import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ContainerBG from "./HeaderComponent/ContainerBG";
import EditButton from "./HeaderComponent/EditButton";
import User from "./HeaderComponent/User";
import Followers from "./Follower_info";
export default function Header({ user, setIsLoading }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <ContainerBG image={{}} styles={styles} insets={insets}>
        <User user={user} setIsLoading={setIsLoading} />
      </ContainerBG>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 15,
  },
});
