import React, { PropsWithChildren, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends PropsWithChildren {}

export default function Screen({ children }: ScreenProps) {
  const scrollView = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [toScrollBottom, setToScrollBottom] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => {
          if (toScrollBottom) {
            scrollView.current?.scrollToEnd({ animated: true });
          }
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          padding: 20,
          flexGrow: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          {children &&
            React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.props.setTime) {
                return React.cloneElement(child, {
                  // @ts-ignore
                  setToScrollBottom: setToScrollBottom,
                });
              }
              return <View style={{ marginBottom: "7%" }}>{child}</View>;
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
