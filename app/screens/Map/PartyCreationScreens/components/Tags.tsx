import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TagItem from "../../../../shared/Tag/TagItem";
import { IEvent } from "../../../../Types/Events";

interface Props {
  tags: IEvent["tags"];
  onDelete?: () => void;
}

const Tags = ({ tags, onDelete }: Props) => {
  return (
    <View style={{ margin: -5 }}>
      {tags?.map((tag: string, i) => (
        <TagItem key={i} tag={tag} id={i} onDelete={onDelete} />
      ))}
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({});
