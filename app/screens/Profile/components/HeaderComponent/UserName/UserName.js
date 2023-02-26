import {Skeleton} from "moti/skeleton";
import React from "react";
import {StyleSheet, View} from "react-native";
import FullName from "./FullName";
import Nickname from "./Nickname";

export default function UserName({ user, isLoading }) {
  const styles = makeStyle(isLoading);
  return (
    <View>
      <View style={styles.padding}>
        <Skeleton show={isLoading} width={"50%"}>
          <FullName user={user} />
        </Skeleton>
      </View>

      <View style={styles.padding}>
        <Skeleton show={isLoading} width={"50%"}>
          <Nickname user={user} />
        </Skeleton>
      </View>
    </View>
  );
}

const makeStyle = (isLoading) =>
  StyleSheet.create({
    padding: {
      paddingVertical: isLoading ? 5 : 0,
    },
  });
