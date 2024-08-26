import { Transaction } from "@/models/transaction";
import TransactionCard from "../TransactionCard";
import { render } from '@testing-library/react-native';

describe('TransactionCard', () => {
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
});