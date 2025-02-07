import { useState } from 'react';

import ChangeEntityCurrencyModalContent from 'components/change-entity-currency-modal-content/ChangeEntityCurrencyModalContent';
import { useChangeCurrency } from 'features/change-transaction-category-currency-modal/hooks/useChangeCurrency';
import { useGetAreRelatedTransactionsExist } from 'features/change-transaction-category-currency-modal/hooks/useGetAreRelatedTransactionsExist';
import { TChangeTransactionCategoryCurrencyModalDataProps } from 'features/change-transaction-category-currency-modal/types/changeTransactionCategoryCurrencyModalDataProps';
import { getDefaultCurrency } from 'features/change-transaction-category-currency-modal/utils/getDefaultCurrency';
import { EditTransactionCategoryCurrencyDtoCurrencyEnum } from 'types/generated.types';

interface IChangeTransactionCategoryCurrencyModalContentProps
    extends TChangeTransactionCategoryCurrencyModalDataProps {
    onClose: VoidFunction;
}

const OPTIONS = Object.values(EditTransactionCategoryCurrencyDtoCurrencyEnum);

export default function ChangeTransactionCategoryCurrencyModalContent({
    id,
    type,
    name,
    currency,
    onClose,
}: IChangeTransactionCategoryCurrencyModalContentProps): JSX.Element {
    const initialCurrency = getDefaultCurrency(currency);
    const [newCurrency, setNewCurrency] =
        useState<EditTransactionCategoryCurrencyDtoCurrencyEnum>(
            initialCurrency,
        );

    const {
        isLoading: isRelatedTransactionsLoading,
        areRelatedTransactionsExist,
    } = useGetAreRelatedTransactionsExist(id);

    const { isLoading, change } = useChangeCurrency({
        id,
        type,
        currency: newCurrency,
    });

    return (
        <ChangeEntityCurrencyModalContent
            entityType="category"
            entityName={name}
            isRelatedTransactionsLoading={isRelatedTransactionsLoading}
            areRelatedTransactionsExist={areRelatedTransactionsExist}
            isLoading={isLoading}
            options={OPTIONS}
            newCurrency={newCurrency}
            initialCurrency={initialCurrency}
            onClose={onClose}
            setNewCurrency={setNewCurrency}
            changeCurrency={change}
        />
    );
}
