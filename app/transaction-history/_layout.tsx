import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Button, Pressable } from "react-native";

export default function TransactionHistoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: 'Transaction history',
        headerRight: () => (<Pressable onPress={() => router.navigate('/')}>
          <MaterialCommunityIcons name="logout" size={25}></MaterialCommunityIcons>
        </Pressable>)
      }} />
      <Stack.Screen name="[id]" options={{
        headerTitle: 'Transaction details',
        headerBackTitle: 'Back'
      }} />
    </Stack>
  );
}
