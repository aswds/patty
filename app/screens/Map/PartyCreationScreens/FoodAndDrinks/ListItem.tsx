import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { colors } from "../../../../src/colors";

interface ListItemProps {
  text: string;
  onDelete: (id?: number) => void;
  index: number;
  icon: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ text, onDelete, index, icon }) => {
  const handleDelete = () => {
    onDelete(index);
  };
  const RenderRightActions = () => {
    return (
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    
    <View
      style={styles.listItem}
      // onPress={() => setShowDelete(!showDelete)}
    >
      <Text style={styles.listItemText} numberOfLines={1}>
        {text}
      </Text>
      {icon}
      <RenderRightActions />
    </View>
    // </Swipeable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  listItemText: {
    color: colors.text,
    fontFamily: FontFamily.bold,
    fontSize: 15,
    marginRight: "2%",
    maxWidth: "85%",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  deleteButtonText: {
    color: colors.buttonText,
  },
});

export default ListItem;
