import { Transaction } from "@/models/transaction";
import { useState } from "react";
import * as loadash from "lodash";
import data from '../assets/tranx_history.json'

export const useFetchData = () => {
    const [transaction, setTransaction] = useState<Transaction|undefined>({} as any);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTranxHistory = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTransactions(loadash.shuffle(data));
        }, 1000);
        // fetch('assets/tranx_history.json')
        //     .then((response) => {
        //         setIsLoading(false);
        //         if (response.status !== 200) {
        //             return;
        //         }
        //         return response.json();
        //     })
        //     .then((transactions: Transaction[]) => setTransactions(loadash.shuffle(transactions)))
        //     .catch((err) => console.error(err));
    };

    const getTransactionById = async (id: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTransaction(data.find((trx) => (trx.tranx_id === id)));
        }, 1000);
        // fetch('assets/tranx_history.json')
        //     .then((response) => {
        //         setIsLoading(false);
        //         if (response.status !== 200) {
        //             return;
        //         }
        //         return response.json();
        //     })
        //     .then((transactions: Transaction[]) => setTransaction(transactions.find((trx) => (trx.tranx_id === id))))
        //     .catch((err) => console.error(err));
    };

    return { transaction, transactions, isLoading, getTranxHistory, getTransactionById };
};