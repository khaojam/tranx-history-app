import { Transaction } from "@/models/transaction";
import { useState } from "react";
import data from '../tranx_history.json';

export const useFetchData = () => {
    const [transaction, setTransaction] = useState<Transaction|undefined>({} as any);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTransactions = async () => {
        setIsLoading(true);
        const tranx = data.slice(0, 10);
        setTimeout(() => {
            setTransactions(tranx);
            setIsLoading(false);
        }, 1000);
    };

    const getTransactionById = async (id: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setTransaction(data.find((data) => data.tranx_id === id));
            setIsLoading(false);
        }, 1000);
    };

    return { transaction, transactions, isLoading, getTransactions, getTransactionById };
};