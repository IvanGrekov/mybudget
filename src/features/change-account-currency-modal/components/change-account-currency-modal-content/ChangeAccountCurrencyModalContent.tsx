import { useState } from 'react';

import ChangeEntityCurrencyModalContent from 'components/change-entity-currency-modal-content/ChangeEntityCurrencyModalContent';
import { useChangeCurrency } from 'features/change-account-currency-modal/hooks/useChangeCurrency';
import { useGetAreRelatedTransactionsExist } from 'features/change-account-currency-modal/hooks/useGetAreRelatedTransactionsExist';
import { TChangeAccountCurrencyModalDataProps } from 'features/change-account-currency-modal/types/changeAccountCurrencyModalDataProps';
import { getDefaultCurrency } from 'features/change-account-currency-modal/utils/getDefaultCurrency';
import { EditAccountCurrencyDtoCurrencyEnum } from 'types/generated.types';

interface IChangeAccountCurrencyModalContentProps
    extends TChangeAccountCurrencyModalDataProps {
    onClose: VoidFunction;
}

const OPTIONS = Object.values(EditAccountCurrencyDtoCurrencyEnum);

export default function ChangeAccountCurrencyModalContent({
    id,
    type,
    name,
    currency,
    onClose,
}: IChangeAccountCurrencyModalContentProps): JSX.Element {
    const initialCurrency = getDefaultCurrency(currency);
    const [newCurrency, setNewCurrency] =
        useState<EditAccountCurrencyDtoCurrencyEnum>(initialCurrency);

    const {
        isLoading: isRelatedTransactionsLoading,
        areRelatedTransactionsExist,
    } = useGetAreRelatedTransactionsExist(id);
    const { isLoading, change } = useChangeCurrency({
        id,
        type,
        initialCurrency,
        currency: newCurrency,
    });

    return (
        <ChangeEntityCurrencyModalContent
            entityType="account"
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
