import { getTransactionCategoryListCurrentTab } from 'features/transaction-category-list/utils/transactionCategoryListCurrentTab.utils';
import { useCurrentTab } from 'hooks/useCurrentTab';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

export const useTransactionCategoryListCurrentTab =
    (): TransactionCategoryTypeEnum => {
        const currentTab = useCurrentTab();

        return getTransactionCategoryListCurrentTab(currentTab);
    };
