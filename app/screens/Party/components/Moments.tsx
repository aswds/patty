import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType("image");
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType("video");
    }
  };

  const renderMedia = () => {
    if (mediaType === "image") {
      return <Image source={{ uri: media }} style={styles.media} />;
    } else if (mediaType === "video") {
      return (
        <Video
          source={{ uri: media }}
          style={styles.media}
          useNativeControls
          resizeMode="contain"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        placeholderTextColor="#A0A0A0"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>Choose Video</Text>
      </TouchableOpacity>
      {renderMedia()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  media: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
});

export default PostForm;
