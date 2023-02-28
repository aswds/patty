import { Image, View } from "react-native";
import { styles } from "../Sign_in/styles";
import { image } from "../../../../assets/images";

export const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={image.logo}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </View>
  );
};
