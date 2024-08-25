import TransactionField from "@/components/TransactionField";
import { useFetchData } from "@/hooks/useFetchData";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native"

const TransactionDetails = () => {
    const { id } = useLocalSearchParams();
    const { transaction, getTransactionById, isLoading } = useFetchData();

    useEffect(() => {
        if (typeof id === 'string') {
            getTransactionById(id);
        }
    }, []);

    return (
        <View style={styles.container}>
            { isLoading ? <ActivityIndicator size='large'></ActivityIndicator> : 
                <>
                    <TransactionField field="Transaction id" value={transaction!.tranx_id}></TransactionField>
                    <TransactionField field="Date" value={transaction!.tranx_date}></TransactionField>
                    <TransactionField field="Amount" value={'RM ' + transaction!.tranx_amount}></TransactionField>
                    <TransactionField field="Description" value={transaction!.description}></TransactionField>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 8,
        margin: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderRadius: 5
    },
    tranxDesc: {
        paddingTop: 3,
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default TransactionDetails;