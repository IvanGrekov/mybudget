import {
    Account,
    EditAccountCurrencyDtoCurrencyEnum,
} from 'types/generated.types';

type TUpdateAccountCurrency = (account?: Account) => unknown;

type TGetUpdateAccountCurrency = (args: {
    id: number;
    currency: EditAccountCurrencyDtoCurrencyEnum;
    rate: number;
}) => TUpdateAccountCurrency;

export const getUpdateAccountCurrency: TGetUpdateAccountCurrency = ({
    id,
    currency,
    rate,
}) => {
    return (account) => {
        if (account?.id === id) {
            return {
                ...account,
                currency,
                balance: account.balance * rate,
                initBalance: account.initBalance * rate,
            };
        }

        return account;
    };
};
