import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function TransactionHistoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: 'Transaction history',
        headerRight: () => (<Button title="Logout" onPress={() => router.navigate('/')}></Button>)
      }} />
      <Stack.Screen name="[id]" options={{
        headerTitle: 'Transaction details',
        headerBackTitle: 'Back'
      }} />
    </Stack>
  );
}
