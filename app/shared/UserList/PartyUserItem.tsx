import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { IUser } from "../../Types/User";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { YouText } from "./YouText";

interface PartyUserItemProps {
  user: IUser;
  onSendMinglePress: (uid: string) => void;
}

const PartyUserItem = ({ user, onSendMinglePress }: PartyUserItemProps) => {
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { uid, name, surname, username, image } = user;
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {name} {surname}
        </Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
      {current_user.uid === uid ? (
        <YouText />
      ) : (
        <TouchableOpacity
          style={styles.sendMingleButton}
          onPress={() => onSendMinglePress(uid)}
        >
          <Text style={styles.sendMingleButtonText}>Send Mingle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: colors.text,
  },
  username: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: colors.text_2,
  },
  sendMingleButton: {
    backgroundColor: colors.accentColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sendMingleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PartyUserItem;
