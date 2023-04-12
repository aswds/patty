import React from "react";
import { IEvent } from "../../../Types/Events";
import { Event } from "../../../shared/Events/Event";
import { TouchableOpacity, View } from "react-native";
import TagList from "../PartyCreationScreens/components/TagList";
import Tags from "../PartyCreationScreens/components/Tags";

interface RenderItemProps {
  item: IEvent;
  onPress?: () => void;
}

const RenderItem = ({ item, onPress }: RenderItemProps): JSX.Element => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <Event markerInfo={item} isJoinedEvent={true} />
        <Tags tags={item.tags} />
      </TouchableOpacity>
    </View>
  );
};

export default RenderItem;
