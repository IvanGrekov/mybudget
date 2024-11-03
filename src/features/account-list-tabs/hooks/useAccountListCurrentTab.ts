import { getAccountListCurrentTab } from 'features/account-list-tabs/utils/accountListCurrentTab.utils';
import { useCurrentTab } from 'hooks/useCurrentTab';
import { AccountTypeEnum } from 'types/generated.types';

export const useAccountListCurrentTab = (): AccountTypeEnum => {
    const currentTab = useCurrentTab();

    return getAccountListCurrentTab(currentTab);
};
