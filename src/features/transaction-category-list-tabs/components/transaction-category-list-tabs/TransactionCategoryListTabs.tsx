import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

interface ITransactionCategoryListTabsProps {
    isDisabled?: boolean;
}

export default function TransactionCategoryListTabs({
    isDisabled,
}: ITransactionCategoryListTabsProps): JSX.Element {
    return (
        <Tabs>
            <Tab
                value={TransactionCategoryTypeEnum.EXPENSE}
                label="Expenses"
                isDisabled={isDisabled}
            />

            <Tab
                value={TransactionCategoryTypeEnum.INCOME}
                label="Incomes"
                isDisabled={isDisabled}
            />
        </Tabs>
    );
}
