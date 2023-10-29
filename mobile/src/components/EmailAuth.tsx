// Can reference this file for other auth providers: https://github.com/supabase-community/create-t3-turbo/blob/main/apps/expo/src/app/profile.tsx#L91
import { useState } from "react";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
export default function EmailAuth() {
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginorSignUp = async () => {
    if (isSignUp) {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log(error);
      if (error) Alert.alert("Error", error.message);
    }
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert("Error", error.message);
    else if (data.user) {
      setIsSignUp(false);
      router.replace("/");
    }
  };

  return (
    <View className="flex-col gap-6 bg-slate-300 w-full h-full">
      <TextInput
        className="rounded bg-white/10 p-4 text-black"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="Email"
      />
      <View className="relative space-y-1">
        <TextInput
          className="rounded bg-white/10 p-4 text-black"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          placeholder="Password"
        />
        <Pressable
          className="absolute right-2"
          onPress={() => setShowPassword((prev) => !prev)}
        >
          {/* {showPassword && <AntDesign name="eye" size={24} color="#A1A1A9" />}
            {!showPassword && <AntDesign name="eyeo" size={24} color="#A1A1A9" />} */}
        </Pressable>
      </View>

      <Pressable className="h-4" onPress={() => setIsSignUp((prev) => !prev)}>
        <Text className="flex-1 text-black">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </Text>
      </Pressable>

      <TouchableOpacity
        onPress={handleLoginorSignUp}
        className="flex-row items-center justify-center rounded-lg bg-emerald-400 p-2"
      >
        <Text className="ml-1 text-xl font-medium">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
