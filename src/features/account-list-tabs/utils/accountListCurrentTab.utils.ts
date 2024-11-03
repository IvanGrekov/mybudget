import { ACCOUNT_LIST_DEFAULT_TAB } from 'features/account-list-tabs/constants/accountListDefaultTab';
import { AccountTypeEnum } from 'types/generated.types';
import { getCurrentTab } from 'utils/getCurrentTab';

export const getAccountListCurrentTab = (
    currentTab: string,
): AccountTypeEnum => {
    if (!currentTab) {
        return ACCOUNT_LIST_DEFAULT_TAB;
    }

    for (const tab of Object.values(AccountTypeEnum)) {
        if (tab === currentTab) {
            return tab;
        }
    }

    return ACCOUNT_LIST_DEFAULT_TAB;
};

export const getAccountListCurrentTabFromUrl = (
    url: string,
): AccountTypeEnum => {
    const currentTab = getCurrentTab(url);

    return getAccountListCurrentTab(currentTab);
};
