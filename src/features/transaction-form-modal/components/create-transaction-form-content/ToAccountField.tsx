import { useFormContext } from 'react-hook-form';

import EntityOptionItem from 'components/entity-option-item/EntityOptionItem';
import ErrorMessage from 'components/error-message/ErrorMessage';
import FormSelectField from 'components/form-fields/FormSelectField';
import LinearProgress from 'components/linear-progress/LinearProgress';
import BalanceAfterTransaction from 'features/transaction-form-modal/components/create-transaction-form-content/BalanceAfterTransaction';
import {
    TRANSACTION_FORM_FIELD_NAMES,
    TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/transactionForm.constants';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { getToAccountBalanceAfterTransaction } from 'features/transaction-form-modal/utils/getToAccountBalanceAfterTransaction';
import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import { AccountTypeEnum } from 'types/generated.types';

export default function ToAccountField(): JSX.Element | null {
    const { watch } = useFormContext<TCreateTransactionFormValues>();
    const { accounts, isLoading } = useGetAllAccounts();

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!accounts) {
        return null;
    }

    const transactionType = watch('type');
    const transactionValue = watch('value');
    const transactionFee = watch('fee');
    const currencyRate = watch('currencyRate');
    const fromAccount = watch('fromAccount');
    const toAccount = watch('toAccount');

    const filteredAccounts = accounts.filter(({ id, type, balance }) => {
        if (id === fromAccount?.id) {
            return false;
        }

        if (type === AccountTypeEnum.I_OWE && balance <= 0) {
            return false;
        }

        return true;
    });

    if (!filteredAccounts.length) {
        return <ErrorMessage message="No accounts found" />;
    }

    return (
        <>
            <FormSelectField
                name={TRANSACTION_FORM_FIELD_NAMES.toAccount}
                label={TRANSACTION_FORM_FIELD_LABELS.toAccount}
                options={filteredAccounts}
                isClearable={true}
                shouldAddSearch={true}
                getOptionLabel={(option) => option.name}
                getOptionReactNode={({
                    name,
                    currency,
                    balance,
                    iconName,
                    iconColor,
                }) => (
                    <EntityOptionItem
                        name={name}
                        balance={balance}
                        currency={currency}
                        iconName={iconName}
                        iconColor={iconColor}
                    />
                )}
            />

            <BalanceAfterTransaction
                value={getToAccountBalanceAfterTransaction({
                    transactionValue,
                    transactionType,
                    toAccount,
                    transactionFee,
                    currencyRate,
                })}
                currency={toAccount?.currency}
            />
        </>
    );
}
