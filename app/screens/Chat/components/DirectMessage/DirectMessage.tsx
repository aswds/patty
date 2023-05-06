import React, { useState } from "react";

import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import DirectMessageListHeader from "./components/DirectMessageListHeader";
import { colors } from "../../../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Input from "../../../../shared/Input/Input";
import { isAndroid } from "../../../../src/platform";
import SendButton from "./components/SendButton";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

const DirectMessage = ({ route }) => {
  const insets = useSafeAreaInsets();
  const [paddingBottom, setPaddingBottom] = useState(insets.bottom);
  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? "height" : "padding"}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <DirectMessageListHeader user={route.params?.user} />
          }
          data={[""]}
          style={styles.container}
          renderItem={() => {}}
        />
        <View style={[styles.footer, { paddingBottom }]}>
          <Input
            style={styles.inputContainer}
            inputStyle={styles.inputStyle}
            placeholder={"Write something"}
            placeholderTextColor={colors.iconColor}
            isValid={true}
            onFocus={() => {
              setPaddingBottom(10);
            }}
            onEndEditing={() => {
              setPaddingBottom(insets.bottom);
            }}
          />
          <SendButton onPress={() => {}} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inputContainer: {
    borderRadius: 999,
    marginTop: 0,
    height: "100%",
  },
  inputStyle: { color: colors.text, fontFamily: FontFamily.medium },
  backButtonContainer: {
    position: "relative",
    top: 0,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
export default DirectMessage;
