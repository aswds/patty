import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { colors } from "../../../src/colors";
import { FieldValue } from "firebase/firestore";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

interface PartyStatsProps {
  startedAt: Date | FieldValue | undefined;
  guests: number;
}

const PartyStats: React.FC<PartyStatsProps> = ({ startedAt, guests }) => {
  useEffect(() => {
    return () => {};
  }, []);

  const calculateHoursUp = () => {
    if (!startedAt) {
      return null;
    }
    const now = new Date().getTime();
    const partyStart = new Date(startedAt).getTime();
    const hoursUp = Math.floor((now - partyStart) / (1000 * 60 * 60));
    return hoursUp;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <FontAwesome5 name="users" size={24} color={colors.text} />
        <Text style={styles.textStyle}>
          guests:
          <Text style={styles.highlightTextStyle}> {guests}</Text>
        </Text>
      </View>

      <View style={styles.subContainer}>
        <Entypo name="time-slot" size={24} color={colors.text} />
        <Text style={styles.textStyle}>
          party has been up for:{" "}
          <Text style={styles.highlightTextStyle}>
            {calculateHoursUp()} hours
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default PartyStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    color: colors.text,
    textAlign: "center",
  },
  highlightTextStyle: {
    fontFamily: FontFamily.extra_bold,
    color: colors.accentColor,
  },
});
