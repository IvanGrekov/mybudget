import { TRANSACTION_CATEGORY_LIST_DEFAULT_TAB } from 'features/transaction-category-list-tabs/constants/transactionCategoryListDefaultTab';
import { TransactionCategoryTypeEnum } from 'types/generated.types';
import { getCurrentTab } from 'utils/getCurrentTab';

export const getTransactionCategoryListCurrentTab = (
    currentTab: string,
): TransactionCategoryTypeEnum => {
    if (!currentTab) {
        return TRANSACTION_CATEGORY_LIST_DEFAULT_TAB;
    }

    for (const tab of Object.values(TransactionCategoryTypeEnum)) {
        if (tab === currentTab) {
            return tab;
        }
    }

    return TRANSACTION_CATEGORY_LIST_DEFAULT_TAB;
};

export const getTransactionCategoryListCurrentTabFromUrl = (
    url: string,
): TransactionCategoryTypeEnum => {
    const currentTab = getCurrentTab(url);

    return getTransactionCategoryListCurrentTab(currentTab);
};
