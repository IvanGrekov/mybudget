import { useState } from 'react';

import ChangeEntityCurrencyModalContent from 'components/change-entity-currency-modal-content/ChangeEntityCurrencyModalContent';
import { useChangeCurrency } from 'features/transaction-category-list/components/change-currency-modal/hooks/useChangeCurrency';
import { useGetAreRelatedTransactionsExist } from 'features/transaction-category-list/components/change-currency-modal/hooks/useGetAreRelatedTransactionsExist';
import { TChangeCategoryCurrencyModalDataProps } from 'features/transaction-category-list/components/change-currency-modal/types/changeCategoryCurrencyModalDataProps';
import { getDefaultCurrency } from 'features/transaction-category-list/components/change-currency-modal/utils/getDefaultCurrency';
import { EditTransactionCategoryCurrencyDtoCurrencyEnum } from 'types/generated.types';

interface IChangeCategoryCurrencyModalContentProps
    extends TChangeCategoryCurrencyModalDataProps {
    onClose: VoidFunction;
}

const OPTIONS = Object.values(EditTransactionCategoryCurrencyDtoCurrencyEnum);

export default function ChangeCategoryCurrencyModalContent({
    id,
    type,
    name,
    currency,
    onClose,
}: IChangeCategoryCurrencyModalContentProps): JSX.Element {
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
