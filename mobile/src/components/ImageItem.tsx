import { FileObject } from "@supabase/storage-js";
import { Image, View, Text, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Image item component that displays the image from Supabase Storage and a delte button
const ImageItem = ({
  itemName,
  userId,
  onRemoveImage,
}: {
  itemName: string;
  userId: string;
  onRemoveImage: () => void;
}) => {
  const [image, setImage] = useState<string>("");
  const supabase = useSupabaseClient();

  // Get the image from Supabase Storage
  useEffect(() => {
    supabase.storage
      .from("userphotos")
      .download(`${userId}/${itemName}`)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      });
  }, [supabase]);

  return (
    <View
      style={{ flexDirection: "row", margin: 1, alignItems: "center", gap: 5 }}
    >
      {image ? (
        <Image style={{ width: 80, height: 80 }} source={{ uri: image }} />
      ) : (
        <View style={{ width: 80, height: 80, backgroundColor: "#1A1A1A" }} />
      )}
      <Text style={{ flex: 1, color: "#fff" }}>{itemName}</Text>
      {/* Delete image button */}
      <TouchableOpacity onPress={onRemoveImage}>
        <Ionicons name="trash-outline" size={20} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageItem;
