import { act, renderHook } from "@testing-library/react-native";
import { useFetchData } from "../useFetchData";

describe('useFetchData', () => {
    it('should initialise transaction with object', () => {
        const { result } = renderHook(() => useFetchData());

        expect(result.current.transaction).toBeDefined();
    });

    it('should initialise transactions with empty array', () => {
        const { result } = renderHook(() => useFetchData());

        expect(result.current.transactions).toEqual([]);
    });

    it('should initialise isLoading as false', () => {
        const { result } = renderHook(() => useFetchData());

        expect(result.current.isLoading).toBe(false);
    });

    describe('getTranxHistory()', () => {
        it('should return transaction history', async () => {
            jest.useFakeTimers();
            const { result } = renderHook(() => useFetchData());

            await act(async () => {
                await result.current.getTranxHistory();
                jest.runAllTimers();
            });
            
            expect(result.current.transactions.length).toBeGreaterThan(0);
        });
    });

    describe('getTransactionById()', () => {
        it('should return transaction when id is valid', async () => {
            jest.useFakeTimers();
            const { result } = renderHook(() => useFetchData());

            await act(async () => {
                await result.current.getTransactionById('100002');
                jest.runAllTimers();
            });
            
            expect(result.current.transaction?.tranx_id).toBe('100002');
        });

        it('should return undefined when id is invalid', async () => {
            jest.useFakeTimers();
            const { result } = renderHook(() => useFetchData());

            await act(async () => {
                await result.current.getTransactionById('11');
                jest.runAllTimers();
            });
            
            expect(result.current.transaction).toBeUndefined();
        });
    });
});