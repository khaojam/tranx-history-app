import TransactionCard from "@/components/TransactionCard";
import { useBiometricAuthentication } from "@/hooks/useBiometricAuthentication";
import { useFetchData } from "@/hooks/useFetchData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text, Pressable, Alert } from "react-native"

const TransactionHistory = () => {
    const { transactions, isLoading, getTranxHistory } = useFetchData();
    const { authenticate, checkBiometricSupport, isBiometricSupported, hasEnrolled } = useBiometricAuthentication();
    const [showAmount, setShowAmount] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        checkBiometricSupport();
        getTranxHistory();
    }, []);

    useEffect(() => {
        setShowAmount(!isBiometricSupported);
    }, [isBiometricSupported]);

    useEffect(() => {
        setRefreshing(false);
    }, [transactions]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getTranxHistory();
      }, []);

    const showAmountOnPress = async () => {
        if(!showAmount) {
            const result = await authenticate();
            if(result.success) {
                setShowAmount(true);
            } else {
                Alert.alert(
                    hasEnrolled ? 'Authentication failed' : 'Warning', 
                    hasEnrolled ? 'Could not authenticate. Please try again.' : 
                    'Biometric authentication is required for login. Please enroll your biometrics in your device settings.', 
                    [{ text: 'OK' }]
                );
            }
            return;
        }
        setShowAmount(!showAmount);   
    };

    return (
        <View style={styles.container}>
            {isBiometricSupported && 
                <View style={styles.actionContainer}>
                    <Pressable onPress={showAmountOnPress}>
                        <MaterialCommunityIcons name={showAmount ? 'eye-off' : 'eye'} size={30}></MaterialCommunityIcons>
                    </Pressable>
                </View>
            }
            {isBiometricSupported && <Text style={{ textAlign: 'center' }}>Pull to refresh</Text>}
            {isLoading ? 
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View> : 
                <FlatList 
                    style={styles.transactionList} 
                    data={transactions} 
                    renderItem={({item}) =>  
                        <TransactionCard 
                            id={item.tranx_id}
                            date={item.tranx_date} 
                            amount={item.tranx_amount}
                            description={item.description}
                            type={item.type}
                            maskedAmount={!showAmount}
                        ></TransactionCard> 
                    } 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    actionContainer: {
        flexDirection: 'row-reverse',
        padding: 15
    },
    loadingContainer: {
        flex: 1,
        paddingTop: 10,
        alignContent: 'center'
    },
    transactionList: {
        paddingVertical: 10,
        width: '100%',
        height: '100%'
    }
});

export default TransactionHistory;