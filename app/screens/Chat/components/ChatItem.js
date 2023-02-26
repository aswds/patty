import React from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../src/colors";
import UserPicture from "./UserPicture";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from "../../../../assets/fonts/Fonts";

const ChatItem = ({ user }) => {
  const navigation = useNavigation();
  function ChatPreviousMessage() {
    return (
      <View style={styles.previousMessageContainer}>
        <Text style={styles.previousMessageTextStyle} numberOfLines={1}>
          {user.messageText}
        </Text>
        <View>
          <Entypo name="dot-single" size={35} color={colors.accentColor} />
        </View>
      </View>
    );
  }
  function ChatTime() {
    return (
      <View>
        <Text style={styles.timeTextStyle}>{user.messageTime}</Text>
      </View>
    );
  }

  function ChatName() {
    return (
      <View style={styles.chatNameContainer}>
        <Text style={styles.textStyle} numberOfLines={2}>
          {user.name}
        </Text>
      </View>
    );
  }
  function onPress() {
    navigation.navigate("DirectMessage", { user: user });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <UserPicture />
        <View style={styles.textContainer}>
          <View style={styles.topTextContainer}>
            <ChatName />
            <ChatTime />
          </View>
          <ChatPreviousMessage />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.input,
    marginVertical: 10,
    borderRadius: 25,
    width: "90%",
    alignSelf: "center",
  },
  innerContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    margin: "5%",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: colors.accentColor,
  },
  topTextContainer: {
    maxWidth: "90%",
    width: Dimensions.get("window").width / 1.3,
    marginBottom: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeTextStyle: {
    color: colors.text_2,
    fontFamily: FontFamily.regular,
    fontSize: 12.5,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  previousMessageContainer: {
    flex: 1,
    maxWidth: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  previousMessageTextStyle: {
    fontFamily: FontFamily.regular,
    width: "85%",
    color: colors.text_2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: colors.text,
  },
  chatNameContainer: {
    maxWidth: "50%",
  },
});

export default ChatItem;
