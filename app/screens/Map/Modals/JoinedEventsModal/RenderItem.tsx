import React from "react";
import { IEvent } from "../../../../Types/Parties";
import { Event } from "../../../../shared/Title/Event";
import { TouchableOpacity } from "react-native";

interface RenderItemProps {
  item: IEvent;
  onPress?: () => void;
}

const RenderItem = ({ item, onPress }: RenderItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Event markerInfo={item} isJoinedEvent={true} />
    </TouchableOpacity>
  );
};

export default RenderItem;
