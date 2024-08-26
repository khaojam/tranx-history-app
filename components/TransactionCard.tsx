import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TransactionCardProps = {
    id: string;
    date?: string;
    description?: string;
    amount?: string;
    type?: string;
    maskedAmount: boolean;
}

const TransactionCard = (props: TransactionCardProps) => {
    return (
        <Pressable onPress={() => {router.navigate({ pathname: '/transaction-history/[id]', params: { id: props.id }})}}>
            <View style={styles.tranxCard}>
                <Text style={styles.tranxDate}>{props.date}</Text>
                <Text>{props.description}</Text>
                <View style={styles.tranxAmtContainer}>
                    {props.maskedAmount ? <Text style={styles.tranxAmt}>RM xxx.xx</Text> : 
                        <Text 
                            style={[styles.tranxAmt, { color: props.type === 'credit' ? 'green' : 'red' }]}
                        >
                            {props.type === 'credit' ? '+' : '-'}RM {props.amount}
                        </Text>
                    }
                </View>
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
    tranxAmtContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        paddingTop: 10
    },
    tranxDate: {
        flex: 3,
        fontWeight: '800',
    },
    tranxAmt: {
        flex: 1,
        alignSelf: 'flex-end',
        fontSize: 15,
        textAlign: 'right',
    },
});

export default TransactionCard;