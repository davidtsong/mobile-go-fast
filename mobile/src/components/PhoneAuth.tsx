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

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  CountryPicker,
  CountryButton,
} from "react-native-country-codes-picker";

function ListHeaderComponent({ countries, lang, onPress }) {
  return (
    <View
      style={{
        paddingBottom: 20,
      }}
    >
      <Text>Popular countries</Text>
      {countries?.map((country, index) => {
        return (
          <CountryButton
            key={index}
            item={country}
            name={country?.name?.[lang || "en"]}
            onPress={() => onPress(country)}
            style={{
              countryButtonStyles: {
                backgroundColor: "white",
              },
            }}
          />
        );
      })}
    </View>
  );
}

export default function PhoneAuth() {
  const supabase = useSupabaseClient();
  const [view, setView] = useState<"getcode" | "verifycode">("getcode");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const phoneNumber = `${countryCode}${phone}`;

  const handleSendCode = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }
    if (!error) {
      setView("verifycode");
    }
  };

  const handleVerifyCode = async () => {
    console.log(phoneNumber, code);

    const {data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: code,
      type: "sms",
    });

    console.log(data, error);
    
    if (error) Alert.alert("Error", error.message + code + phoneNumber);

    if (data.session) {
      Alert.alert("Success", "You are now signed in!");
      router.replace("/");
    }
  };

  if (view === "getcode") {
    return (
      <View className="flex-col gap-6 bg-slate-300 w-full h-[80vh]">
        <View className="flex flex-row w-full">
          <TouchableOpacity
            onPress={() => setShow(true)}
            className="flex flex-row w-16 bg-slate-100 items-center justify-center rounded-lg p-2"
          >
            <Text
              style={{
                color: "black",
                fontSize: 14,
              }}
            >
              {countryCode}
            </Text>
          </TouchableOpacity>
          <TextInput
            className="rounded bg-white/10 p-4 text-black flex-1"
            value={phone}
            autoCapitalize="none"
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            placeholder="Phone number"
          />
        </View>
        <TouchableOpacity
          onPress={handleSendCode}
          className="flex-row items-center justify-center rounded-lg bg-emerald-400 p-2"
        >
          <Text className="ml-1 text-xl font-medium">Get code</Text>
        </TouchableOpacity>
        <View>
          <CountryPicker
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setShow(false);
            }}
            onBackdropPress={() => setShow(false)}
            ListHeaderComponent={ListHeaderComponent}
            popularCountries={["us", "br", "ca"]}
            style={{
              modal: {
                height: 600,
              },
              itemsList: {
                backgroundColor: "white",
              },
              countryButtonStyles: {
                backgroundColor: "white",
              },
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-col gap-6 bg-slate-300 w-full h-full">
        <TextInput
          className="rounded bg-white/10 p-4 text-black"
          value={code}
          autoCapitalize="none"
          onChangeText={setCode}
          placeholder="Verify Code"
        />

        <TouchableOpacity
          onPress={handleVerifyCode}
          className="flex-row items-center justify-center rounded-lg bg-emerald-400 p-2"
        >
          <Text className="ml-1 text-xl font-medium">Verify code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
