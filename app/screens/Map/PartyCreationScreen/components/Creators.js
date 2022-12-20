import React, { useState } from "react";
import { StyleSheet } from "react-native";
import CreatorImage from "./CreatorItem";
import CreatorNames from "./CreatorText";

export default function Creators() {
  const [creators, setCreators] = useState([]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Add creator</Text>
      </View>
      <View>
        <View>
          {creators.map((creator) => (
            <CreatorImage user={creator} />
          ))}
        </View>
        <View>
          <CreatorNames users={creators} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    position: "absolute",
    top: "5%",
    width: "50%",
    flexDirection: "row",
  },
  textStyle: {
    fontFamily: "WorkSans-Regular",
    fontSize: 13,
    color: "#4C678F",
  },
});
