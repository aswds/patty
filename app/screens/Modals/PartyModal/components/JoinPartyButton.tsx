import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";
import { isAndroid } from "../../../../src/platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
interface JoinEventButtonProps {
  data: IEvent;
  onPress: (data: IEvent) => void;
  isJoinedEvent: boolean;
  isCreator: boolean;
}

export function JoinEventButton({
  data,
  onPress,
  isJoinedEvent,
  isCreator,
}: JoinEventButtonProps): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ width: "100%", height: 50 + insets.bottom }}>
      <TouchableOpacity style={styles.buttonBg} onPress={() => onPress(data)}>
        {isJoinedEvent ? (
          <Text
            style={[
              styles.textTitleStyle,
              { fontSize: 18, alignItems: "center" },
            ]}
          >
            Leave
          </Text>
        ) : (
          <Text style={[styles.textTitleStyle, { fontSize: 18 }]}>
            Join event
          </Text>
        )}
        {isJoinedEvent ? (
          <AntDesign name="staro" size={24} color={colors.text} />
        ) : (
          <AntDesign name="star" size={24} color={colors.text} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: colors.accentColor,
    flexDirection: "row",

    height: 50,
    marginBottom: isAndroid ? "5%" : 0,
    width: "100%",
    borderRadius: 999999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textTitleStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    paddingRight: 5,
    color: colors.buttonTextColor,
  },
});
