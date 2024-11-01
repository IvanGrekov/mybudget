import { useCurrentTab } from 'hooks/useCurrentTab';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

import { getTransactionCategoryListCurrentTab } from '../utils/transactionCategoryListCurrentTab.utils';

export const useTransactionCategoryListCurrentTab =
    (): TransactionCategoryTypeEnum => {
        const currentTab = useCurrentTab();

        return getTransactionCategoryListCurrentTab(currentTab);
    };
