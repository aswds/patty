import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../../../src/colors";
import TagAddButton from "./TagAddButton";
import TagItem from "./TagItem";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
export function Title({ title, icon }) {
  return (
    <View style={styles.titleContainer}>
      <View>
        <Text style={styles.textStyle}>{title ? title : "Tags"}</Text>
      </View>

      {icon ? (
        icon
      ) : (
        <AntDesign
          name="tago"
          size={20}
          color={colors.iconColor}
          style={{ paddingHorizontal: 5 }}
        />
      )}
    </View>
  );
}
export default function TagList({ setTags, tags }) {
  function onDelete(id) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTags((_tags) => _tags.filter((tag, tag_id) => tag_id !== id));
  }

  function Tags() {
    return (
      <View style={styles.tagContainer}>
        <TagAddButton setTags={setTags} />
        {tags?.map((tag, i) => (
          <TagItem key={i} tag={tag} id={i} onDelete={onDelete} />
        ))}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Title />
      <Tags />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: null,
    width: "100%",
  },
  textStyle: {
    color: colors.iconColor,
    fontSize: 20,
    fontFamily: "WorkSans-Bold",
    marginBottom: "5%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
