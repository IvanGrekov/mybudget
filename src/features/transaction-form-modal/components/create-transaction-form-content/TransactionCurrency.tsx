import { useFormContext } from 'react-hook-form';

import Typography from 'components/typography/Typography';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';

export default function TransactionCurrency(): JSX.Element | null {
    const { watch } = useFormContext<TCreateTransactionFormValues>();

    const fromAccount = watch('fromAccount');
    const fromCategory = watch('fromCategory');
    const currency = fromAccount?.currency || fromCategory?.currency;

    if (!currency) {
        return null;
    }

    return <Typography>{currency}</Typography>;
}
