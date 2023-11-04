import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Link, Stack, router } from 'expo-router';
import { Alert, Image, Pressable, Text, View } from 'react-native';

export default function Home() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
    Alert.alert('Logged out successfully');
    router.replace('/');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
   >
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'My home',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Text  className="text-[32px]">Home Screen</Text>
      <Text  className="text-[32px]">{user ? user.id : "Not signed in yet"}</Text>
      <Link  className="text-[32px]" href={{ pathname: 'details', params: { name: 'Bacon' } }}>Go to Details</Link>
      <Link  className="text-[32px]" href={{ pathname: 'emailLogin'}}>Email Login</Link>
      <Link  className="text-[32px]" href={{ pathname: 'login'}}>Phone Login</Link>
      <Link  className="text-[32px]" href={{ pathname: 'upload'}}>Upload</Link>
      <Link  className="text-[32px]" href={{ pathname: 'viewUploads'}}>View uploads</Link>
      <Pressable onPress={logOut}>
      <Text className="text-[32px]" onClick={logOut}>Log out</Text>
      </Pressable>
    </View>
    
  );
}
