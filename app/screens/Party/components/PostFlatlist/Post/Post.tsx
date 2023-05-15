import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import { Description } from "../../ShowMoreText";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import UserContainer from "./UserContainer";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import DownloadButton from "./DownloadButton";
interface Props {
  imageSource: any;
  description: string;
}

const ImageWithEmojiUI: React.FC<Props> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <ImageBackground source={{ uri: item?.image }} style={styles.image}>
        <View style={styles.topContainer}>
          <UserContainer user={item?.user} />
          <DownloadButton />
        </View>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <View style={styles.descriptionContainer}>
          <Description description={item?.description} />
        </View>

        <View style={styles.rightBottomContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>nay </Text>
            <Text style={styles.buttonText}>{item?.water}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>yay </Text>
            <Text style={styles.buttonText}>{item?.flames}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modalBackground,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  descriptionContainer: {
    padding: 5,
    borderRadius: 5,
    flexShrink: 1,
  },
  descriptionText: {
    color: colors.text,
    fontFamily: FontFamily.medium,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  leftBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  userNickname: {
    color: "gray",
  },
  rightBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 13,
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});
export default ImageWithEmojiUI;
