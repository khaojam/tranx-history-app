import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TransactionCardProps = {
    id: string;
    date?: string;
    description?: string;
    amount?: string;
    type?: string;
}

const TransactionCard = (props: TransactionCardProps) => {
    return (
        <Pressable onPress={() => {router.navigate({ pathname: '/transaction-history/[id]', params: { id: props.id }})}}>
            <View style={styles.tranxCard}>
                <View style={styles.tranxCardHeader}>
                    <Text style={styles.tranxDate}>{props.date}</Text>
                    <Text style={styles.tranxAmt}>RM {props.amount}</Text>
                </View>
                <Text>{props.description}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tranxCard: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderRadius: 5,
        padding: 5,
        backgroundColor: 'white',
        marginVertical: 3,
        marginHorizontal: 5
    },
    tranxCardHeader: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3
    },
    tranxDate: {
        flex: 3,
        fontWeight: '800',
    },
    tranxAmt: {
        flex: 1,
        alignSelf: 'flex-end',
        fontSize: 15,
        textAlign: 'right'
    },
});

export default TransactionCard;