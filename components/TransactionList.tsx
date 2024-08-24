import { FlatList, StyleSheet } from "react-native";
import TransactionCard from "./TransactionCard";

type TransactionListProps = {
    tranxHistory: {
        tranx_id: string;
        tranx_date: string;
        tranx_amount: string;
        type: string;
        description: string
    }[]
};

const TransactionList = (props: TransactionListProps) => {
    return (
        <FlatList 
            style={styles.transactionList} 
            data={props.tranxHistory} 
            renderItem={({item}) =>  
                <TransactionCard 
                    id={item.tranx_id}
                    date={item.tranx_date} 
                    amount={item.tranx_amount}
                    description={item.description}
                    type={item.type}
                ></TransactionCard> 
            } 
        />
    );
}

const styles = StyleSheet.create({
    transactionList: {
        width: '100%',
        height: '100%'
    }
});

export default TransactionList;