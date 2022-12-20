import React from "react";
import { View, Image } from "react-native";
export default function CreatorImage({ user }) {
  return (
    <View>
      <View style={{ height: 35, aspectRatio: 1 }}>
        <Image source={user.uri} style={{ width: "100%", height: "100%" }} />
      </View>
    </View>
  );
}
