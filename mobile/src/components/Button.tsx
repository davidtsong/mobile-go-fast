import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import tw from "tailwind-react-native-classnames";

export default function Button({ label, onPress }) {
    return (
        <View
            className={`border-4 border-yellow-400 rounded-3xl p-4`}
        >
            <Pressable
                className={`flex-row items-center justify-center bg-white`}
                onPress={onPress}
            >
                <FontAwesome
                    name="picture-o"
                    size={18}
                    color="#25292e"
                    className={`mr-2`}
                />
                <Text className={`text-gray-700`}>{label}</Text>
            </Pressable>
        </View>
    );
}
