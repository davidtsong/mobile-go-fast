import { View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import EmailAuth from "@/components/EmailAuth";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "login",
        }}
      />
      <EmailAuth />
    </View>
  );
}
