import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../../Types/Events";
import { joinEvent } from "../../../Firebase/fetchUserJoinedEvents";

interface JoinEventButtonProps {
  data: IEvent;
}

export function JoinEventButton({ data }: JoinEventButtonProps): JSX.Element {
  function onPress() {
    joinEvent(data);
  }
  return (
    <View style={{ width: "100%", height: 50 }}>
      <TouchableOpacity style={styles.buttonBg} onPress={onPress}>
        <Text style={[styles.textTitleStyle, { fontSize: 18 }]}>
          Join event
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: colors.accentColor,
    height: 50,
    marginBottom: "5%",
    width: "100%",
    borderRadius: 999999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textTitleStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: colors.text,
  },
});
