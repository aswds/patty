import { View, Image } from "react-native";
import { styles } from "../styles";
export const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={{}}
        source={require("../../../../../assets/images/logoAuth.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </View>
  );
};
