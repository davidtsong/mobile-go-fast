import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { FileObject } from "@supabase/storage-js";
import ImageItem from "@/components/ImageItem";

export default function ViewUploads() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [files, setFiles] = useState<{
    id: string;
    description: string;
    uploaded_at: string;
    storage_path: string;
    user_id: string;
  }[]>([]);

  const user = useUser();

  const loadImages = async () => {
    const { data } = await supabase.from("user_photo_uploads").select("*").eq("user_id", user!.id);
    console.log("user:",user);
    console.log("uploads-table:", data);
    if (data) {
      setFiles(data);
    }
  };

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to view your uploads");
      router.replace("/");
    }

    // Load user images
    loadImages();
  }, [user]);

  const onRemoveImage = async (item: FileObject, listIndex: number) => {
    supabase.storage.from('files').remove([`${user!.id}/${item.name}`]);
    const newFiles = [...files];
    newFiles.splice(listIndex, 1);
    setFiles(newFiles);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Uploads",
        }}
      />
      <ScrollView>
        {files.map((item, index) => (
            <>
          <ImageItem key={item.id} itemName={item.storage_path} userId={user!.id} onRemoveImage={() => {}} />
          <Text>{item.description}</Text>
          </>
        ))}
      </ScrollView>
    </View>
  );
}
