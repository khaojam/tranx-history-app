import { Text, View } from "react-native";
import tranxHistory from '../tranx_history.json';
import TransactionList from "@/components/TransactionList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{
        minWidth: 500,
        maxWidth: '80%',
        flex: 2
      }}>
        <TransactionList tranxHistory={tranxHistory}></TransactionList>
      </View>
    </View>
  );
}
