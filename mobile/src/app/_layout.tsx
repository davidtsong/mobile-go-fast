import { Stack } from 'expo-router/stack';
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/utils/supabase";

export default function Layout() {
  return (
    <SessionContextProvider supabaseClient={supabase}>

    <Stack
      screenOptions={{
      
      }}
    />
    </SessionContextProvider>
  );
}


// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import Login from "./components/login";

// export default function App() {
//   return (
//     <SessionContextProvider supabaseClient={supabase}>
//       <View className="flex-1 items-center justify-center bg-white">
//         <Text>Open up App.tsx to start working on your app!</Text>
//         <StatusBar style="auto" />
//         <Login />
//       </View>
//     </SessionContextProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
