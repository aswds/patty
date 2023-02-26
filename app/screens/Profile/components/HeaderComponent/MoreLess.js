import React from "react";
import {Text, TouchableOpacity} from "react-native";

export const MoreLessComponent = ({ truncatedText, fullText }) => {
  const [more, setMore] = React.useState(false);
  return (
    <TouchableOpacity onPress={() => setMore(!more)}>
      <Text>{truncatedText}</Text>
    </TouchableOpacity>
  );
};
