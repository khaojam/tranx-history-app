import { StyleSheet, Text, View } from "react-native";

type TransactionFieldProps = {
    field: string;
    value: string;
}

const TransactionField = (props: TransactionFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.field}>{ props.field }</Text>
            <Text style={styles.value}>{ props.value || undefined }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    field: {
        flex: 3,
        fontSize: 15
    },
    value: {
        flex: 2,
        textAlign: 'right',
        fontWeight: 'bold'
    }
});

export default TransactionField;