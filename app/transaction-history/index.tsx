import TransactionList from "@/components/TransactionList";
import { useFetchData } from "@/hooks/useFetchData";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

const TransactionHistory = () => {
    const { transactions, isLoading, getTransactions } = useFetchData();

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? 
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View> : 
                <TransactionList tranxHistory={transactions}></TransactionList>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        paddingTop: 20,
        alignContent: 'center'
    }
});

export default TransactionHistory;