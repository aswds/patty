import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";

interface JoinEventButtonProps {
  data: IEvent;
  onPress: (data: IEvent) => void;
  isJoinedEvent: boolean;
  isCreator: boolean;
}
function EventButtonText({ title }: { title: string }) {
  return <Text style={[styles.textTitleStyle, { fontSize: 18 }]}>{title}</Text>;
}
function EventButton({
  data,
  onPress,
  isJoinedEvent,
  isCreator,
}: JoinEventButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonBg} onPress={() => onPress(data)}>
      {isJoinedEvent ? (
        <Text style={[styles.textTitleStyle, { fontSize: 18 }]}>Leave</Text>
      ) : (
        <Text style={[styles.textTitleStyle, { fontSize: 18 }]}>
          Join event
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function JoinEventButton({
  data,
  onPress,
  isJoinedEvent,
  isCreator,
}: JoinEventButtonProps): JSX.Element {
  return (
    <View style={{ width: "100%", height: 50, marginBottom: 20 }}>
      <EventButton
        data={data}
        onPress={onPress}
        isJoinedEvent={isJoinedEvent}
        isCreator={isCreator}
      />
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
