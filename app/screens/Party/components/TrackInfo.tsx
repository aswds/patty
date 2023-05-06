import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../src/colors";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import Button from "../../../shared/Buttons/Button";
import ListEmptyComponent from "../../../shared/UserList/ListEmptyComponent";
import _ from "lodash";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Title } from "../../../shared/Title/Title";
import RunningText from "../../../shared/Animations/RunningText";
interface Props {
  trackInfo?: {
    title?: string;
    artist?: string;
    image?: string;
  };
}
const Track = ({ trackInfo }: Props) => {
  return (
    <View style={styles.trackContainer}>
      <View
        style={{
          backgroundColor: colors.accentColor,
          borderRadius: 10,
          shadowOffset: { width: 5, height: 0 },
          shadowColor: "rgba(155 , 50, 50 , 0.6)",
          shadowOpacity: 1,
          shadowRadius: 5,
          zIndex: 1,
        }}
      >
        <Image source={{ uri: trackInfo?.image }} style={styles.image} />
      </View>

      <View style={styles.trackInfoContainer}>
        <RunningText title={trackInfo?.title} artist={trackInfo?.artist} />
      </View>
      <View style={[styles.card, styles.shadowProp]}>
        <Button
          text="Show queu"
          onPress={() => {}}
          style={{ backgroundColor: "transparent", width: "100%" }}
        />
      </View>
    </View>
  );
};
const NoTrack = ({}) => {
  return (
    <ListEmptyComponent
      title="Seems nothing playing here"
      icon={
        <Fontisto
          name="cloudy-gusts"
          size={20}
          color={colors.text}
          style={{ marginVertical: "5%", marginHorizontal: 5 }}
        />
      }
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      textStyle={{
        color: colors.text,
        fontFamily: FontFamily.bold,
        flexShrink: 1,
      }}
      textProps={{
        numberOfLines: 1,
      }}
      titleContainerStyle={{ flexShrink: 1 }}
      button={
        <Button
          text="Add a song"
          onPress={() => {}}
          style={{
            backgroundColor: "transparent",
            width: undefined,
            height: undefined,
            paddingHorizontal: 0,
            marginLeft: "5%",
          }}
        />
      }
    />
  );
};
const TrackInfo = ({ trackInfo }: Props) => {
  return (
    <View style={{ flex: 1, marginVertical: "5%" }}>
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: -1 }}
        end={{ x: 0.75, y: -0.5 }}
        colors={[colors.accentColor, colors.background]}
      >
        {_.isEmpty(trackInfo) ? <NoTrack /> : <Track trackInfo={trackInfo} />}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  shadowProp: {
    shadowOffset: { width: -15, height: 0 },
    shadowColor: colors.background,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  container: {
    padding: 5,
    borderRadius: 10,
  },
  trackContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    aspectRatio: 1,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  trackInfoContainer: { flex: 1 },
  trackNameTextStyle: {
    fontSize: 16,
    fontFamily: FontFamily.extra_bold,
    color: colors.text,
  },
  artistTextStyle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginBottom: 4,
    color: colors.text,
  },
  title: {
    fontFamily: FontFamily.extra_bold,
    fontSize: 20,
    color: colors.text,
  },
});

export default TrackInfo;
