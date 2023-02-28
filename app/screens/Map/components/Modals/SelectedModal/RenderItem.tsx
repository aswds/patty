import React from "react";
import { IDoc } from "../../../../../Types/Parties";
import { Event } from "../../../../../shared/Title/TopInfo_modal";
import { TouchableOpacity } from "react-native";

interface RenderItemProps {
  item: IDoc;
  onPress?: () => void;
}

const RenderItem = ({ item, onPress }: RenderItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Event markerInfo={item} />
    </TouchableOpacity>
  );
};

export default RenderItem;
