import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

export default function TransactionCategoryListTabs(): JSX.Element {
    return (
        <Tabs>
            <Tab value={TransactionCategoryTypeEnum.EXPENSE} label="Expenses" />

            <Tab value={TransactionCategoryTypeEnum.INCOME} label="Incomes" />
        </Tabs>
    );
}
