import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colors } from "../../src/colors";

interface IconButtonProps extends TouchableOpacityProps {
  Icon: any;
  name: string;
  text: string;
  color?: string;
  textStyle: TextStyle;
  size?: number;
}

export function IconButton({
  Icon,
  name,
  text,
  color,
  textStyle,
  size,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Icon name={name} size={size ?? 24} color={color ?? colors.accentColor} />
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
