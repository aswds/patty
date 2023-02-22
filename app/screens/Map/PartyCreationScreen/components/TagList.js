import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../../src/colors";
import TagAddButton from "./TagAddButton";
import TagItem from "../../../../shared/Tag/TagItem";
import * as Haptics from "expo-haptics";
import { Title } from "../../../../shared/Title/Title";
import { AntDesign } from "@expo/vector-icons";
import { descriptionTexts } from "../descriptionTexts";

export default function TagList({ setTags, tags }) {
  function onDelete(id) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTags((tags) => tags.filter((tag, tag_id) => tag_id !== id));
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
      <Title
        icon={
          <AntDesign
            name="tago"
            size={20}
            color={colors.iconColor}
            style={{ paddingHorizontal: 5 }}
          />
        }
        title={"Tags"}
        description={descriptionTexts.tags}
      />
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
    gap: 10,
  },
});
