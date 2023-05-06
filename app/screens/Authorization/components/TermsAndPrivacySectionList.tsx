import React from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { colors } from "../../../src/colors";

interface Section {
  title: string;
  data: string[];
}

interface TermsAndPrivacySectionListProps {
  data: Section[];
}

const TermsAndPrivacySectionList: React.FC<TermsAndPrivacySectionListProps> = ({
  data,
}) => {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.itemStyle}>
      <Text style={styles.itemTextStyle}>{item}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.headerStyle}>
      <Text style={styles.headerTextStyle}>{section.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          style={{ paddingHorizontal: 20 }}
        />
      </SafeAreaView>
    </View>
  );
};

export default TermsAndPrivacySectionList;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.modalBackground,
    justifyContent: "center",
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  headerTextStyle: {
    fontFamily: FontFamily.extra_bold,
    fontSize: 25,
    color: colors.text,
  },
  itemStyle: { paddingVertical: 5 },
  itemTextStyle: { fontFamily: FontFamily.medium, color: colors.text },
});
