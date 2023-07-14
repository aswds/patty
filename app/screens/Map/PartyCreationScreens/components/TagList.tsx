import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";
import TagItem from "../../../../shared/Tag/TagItem";
import { Title } from "../../../../shared/Title/Title";
import { colors } from "../../../../src/colors";
import { descriptionTexts } from "../descriptionTexts";
import TagAddButton from "./TagAddButton";

interface Props {
  setTags: Dispatch<SetStateAction<IEvent["tags"]>>;
  tags: IEvent["tags"];
}

export default function TagList({ setTags, tags }: Props): JSX.Element {
  function onDelete(id: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTags((tags) => tags!.filter((tag, tag_id) => tag_id !== id));
  }

  function Tags(): JSX.Element {
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
            color={colors.text}
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
    width: "100%",
  },
  textStyle: {
    color: colors.iconColor,
    fontSize: 20,
    fontFamily: FontFamily.bold,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
