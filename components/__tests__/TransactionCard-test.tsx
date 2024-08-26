import { Transaction } from "@/models/transaction";
import TransactionCard from "../TransactionCard";
import { fireEvent, render } from '@testing-library/react-native';
import { router } from "expo-router";

jest.mock('expo-router');

describe('TransactionCard', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should render transaction card with props', () => {
        const transactionMock: Transaction = {
            tranx_id: '123',
            tranx_date: '12-12-2023',
            tranx_amount: '303.13',
            type: 'credit',
            description: 'Bonus cash'
        };
        const { getByText, queryByText } = render(<TransactionCard 
            id={transactionMock.tranx_id}
            date={transactionMock.tranx_date} 
            amount={transactionMock.tranx_amount}
            description={transactionMock.description}
            type={transactionMock.type}
            maskedAmount={false} />);

        expect(queryByText('123')).toBeNull();
        expect(getByText('12-12-2023')).toBeDefined();
        expect(getByText('+RM 303.13')).toBeDefined();
        expect(getByText('Bonus cash')).toBeDefined();
        expect(queryByText('credit')).toBeNull();
    });

    it('should perform navigate when card is pressed', () => {
        const navigateMock = router.navigate as jest.Mock;

        const transactionMock: Transaction = {
            tranx_id: '123',
            tranx_date: '12-12-2023',
            tranx_amount: '303.13',
            type: 'credit',
            description: 'Bonus cash'
        };
        const { getByTestId } = render(<TransactionCard 
            id={transactionMock.tranx_id}
            date={transactionMock.tranx_date} 
            amount={transactionMock.tranx_amount}
            description={transactionMock.description}
            type={transactionMock.type}
            maskedAmount={false} />
        );

        fireEvent.press(getByTestId('tranxCardPressable'));
        expect(navigateMock).toHaveBeenCalledWith({ pathname: '/transaction-history/[id]', params: { id: '123' }});
    });
});