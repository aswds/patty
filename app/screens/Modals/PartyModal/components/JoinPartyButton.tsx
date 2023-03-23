import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";

interface JoinEventButtonProps {
  data: IEvent;
  onPress: (data: IEvent) => void;
}

function JoinButton({ data, onPress }: JoinEventButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonBg} onPress={() => onPress(data)}>
      <Text style={[styles.textTitleStyle, { fontSize: 18 }]}>Join event</Text>
    </TouchableOpacity>
  );
}

export function JoinEventButton({
  data,
  onPress,
}: JoinEventButtonProps): JSX.Element {
  return (
    <View style={{ width: "100%", height: 50 }}>
      <JoinButton data={data} onPress={onPress} />
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
