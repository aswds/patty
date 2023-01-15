import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CreatorImage from "./CreatorImages";
import CreatorNames from "./CreatorText";
import { fetchUsers_ } from "./fetchUsers";
import { useSelector } from "react-redux";
import { colors } from "../../../../src/colors";
export default function Creators() {
  const [creators, setCreators] = useState([]);
  const user = useSelector((state) => state.user_state.current_user);
  // useEffect(() => {
  //   fetchUsers_(setCreators);
  // }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addCreatorText}>
        <Text style={styles.textStyle}>Creator</Text>
      </TouchableOpacity>
      <View style={styles.userImagesContainer}>
        <CreatorImage user={user} />
        <View style={{ margin: 10 }}>
          <Text style={styles.textStyle_CreatorsName}>You</Text>
        </View>

        {/*{creators.slice(0, 3).map((creator, i) => (*/}
        {/*  <CreatorImage user={{ creator, i }} key={i} />*/}
        {/*))}*/}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
  },
  userImagesContainer: {
    width: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addCreatorText: {
    height: 50,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "WorkSans-Regular",
    fontSize: 13,
    color: "#4C678F",
  },
  textStyle_CreatorsName: {
    fontFamily: "WorkSans-Medium",
    fontSize: 13,
    color: colors.iconColor,
  },
});
