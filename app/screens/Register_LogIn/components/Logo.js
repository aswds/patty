import { Image, View } from "react-native";
import { styles } from "../Sign_in/styles";

export const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={{}}
        source={require("../../../../assets/images/pattyLogo2.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </View>
  );
};
