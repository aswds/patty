import React from "react";
import { IEvent } from "../../../Types/Events";
import { Event } from "../../../shared/Title/Event";
import { TouchableOpacity, View } from "react-native";

interface RenderItemProps {
  item: IEvent;
  onPress?: () => void;
}

const RenderItem = ({ item, onPress }: RenderItemProps): JSX.Element => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <Event markerInfo={item} isJoinedEvent={true} />
      </TouchableOpacity>
    </View>
  );
};

export default RenderItem;
