import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Screen(props) {
  const scrollView = useRef();
  const insets = useSafeAreaInsets();
  const [toScrollBottom, setToScrollBottom] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => {
          if (toScrollBottom) {
            scrollView.current.scrollToEnd({ animated: true });
          }
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          padding: 20,
          backgroundColor: "yellow",
        }}
      >
        <View style={{ flex: 1 }}>
          {React.Children.map(props.children, (child, i) => {
            if (child.type.name === "PickTime" && child.props.setTime) {
              return React.cloneElement(child, {
                setToScrollBottom: setToScrollBottom,
              });
            }
            return child;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderTopRightRadius: isAndroid ? 0 : 45,
    // borderTopLeftRadius: isAndroid ? 0 : 45,
    backgroundColor: colors.background,
  },
});
