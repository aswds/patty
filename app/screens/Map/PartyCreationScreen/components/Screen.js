import React from "react";
import { useRef } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
export default function Screen(props) {
  const scrollView = useRef();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current.scrollToEnd({ animated: true })
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // borderTopRightRadius: isAndroid ? 0 : 45,
    // borderTopLeftRadius: isAndroid ? 0 : 45,
    backgroundColor: colors.background,
  },
});
