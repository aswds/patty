import React from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatListHeader from "./ChatListHeader";
import ChatItem from "./ChatItem";

const ChatList = ({ data }) => {
  const insets = useSafeAreaInsets();
  return (
    <FlatList
      ListHeaderComponent={ChatListHeader}
      stickyHeaderIndices={[0]}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatItem user={item} />}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 110,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ChatList;
