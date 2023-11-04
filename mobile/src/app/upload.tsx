import Button from "@/components/Button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "@/components/ImageViewer";
import * as Crypto from "expo-crypto";
import { decode } from "base64-arraybuffer";
import { GetRoast } from "@/utils/ai";
const PlaceholderImage = require("@/assets/example.jpg");

export default function Home() {
  const user = useUser();
  const [imageURI, setimageURI] = useState<string | null>(null);
  const [imageType, setimageType] = useState<string | null>(null);
  const [imageBase64, setimageBase64] = useState<string>("");
  const [roast, setRoast] = useState<string>("");
  const supabase = useSupabaseClient();
  const router = useRouter();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: .01,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
  
      setimageURI(result.assets[0].uri);
      setimageType(result.assets[0].type as string);
      setimageBase64(result.assets[0].base64 as string);
    } else {
      alert("You did not select any image.");
    }
  };

  const takeImageAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64:true
    });

    if (!result.canceled) {
      console.log(result);
      setimageURI(result.assets[0].uri);
      setimageType(result.assets[0].type as string);
      setimageBase64(result.assets[0].base64 as string);
    } else {
      alert("You did not select any image.");
    }
  };

  const getBackendRoast = async () => {
    console.log("Getting roast")
    // Get file from uri
    // const response = await fetch(imageURI!);
    // const blob = await response.blob();
    // const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    // console.log(file);
    // Get roast from backend
    // const roast = await GetRoast(file);
    const roast = "Get roasted!"

    console.log(roast);
    setRoast(roast);
  }
  const submitImage = async () => {
    if (!imageURI) {
      alert("You did not select any image.");
      return;
    }

    if (!user) {
      alert("You are not logged in.");
      return;
    }
    console.log("submitting image");

    const UUID = Crypto.randomUUID();
    const filename = UUID + ".jpg";

    const filepath = user.id + "/" + filename;
    const { data, error } = await supabase.storage
      .from("userphotos")
      .upload(filepath, decode(imageBase64), {
        contentType: imageType ?? "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    const { data: data2, error: error2 } = await supabase
      .from("user_photo_uploads")
      .insert({
        user_id: user?.id,
        storage_path: filename,
        description: roast,
      });

    if (error || error2) {
      console.log(error);
      console.log(error2);
    } else {
      console.log(data);
      console.log(data2);
      router.replace("/viewUploads");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Upload a Photo",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ImageViewer
        placeholderImageSource={PlaceholderImage}
        selectedImage={imageURI}
      />
      <Text>{roast}</Text>
      <Button label="Choose image" onPress={pickImageAsync} />
      <Button label="Take image" onPress={takeImageAsync} />
      <Button label="Get roast" onPress={getBackendRoast} />
      <Button label="Submit" onPress={submitImage} />

    </View>
  );
}
