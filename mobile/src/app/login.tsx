import { View, Text } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Login from "@/components/EmailAuth";
import PhoneAuth from "@/components/PhoneAuth";

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
      <PhoneAuth />
    </View>
  );
}
