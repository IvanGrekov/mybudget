import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { TransactionCategoryTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface ITransactionCategoryListTabsProps {
    isDisabled?: boolean;
}

export default function TransactionCategoryListTabs({
    isDisabled,
}: ITransactionCategoryListTabsProps): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();

    return (
        <Tabs>
            <Tab
                value={TransactionCategoryTypeEnum.EXPENSE}
                label={getCapitalizedEnumValue(
                    TransactionCategoryTypeEnum.EXPENSE,
                    entityNameTranslations,
                )}
                isDisabled={isDisabled}
            />

            <Tab
                value={TransactionCategoryTypeEnum.INCOME}
                label={getCapitalizedEnumValue(
                    TransactionCategoryTypeEnum.INCOME,
                    entityNameTranslations,
                )}
                isDisabled={isDisabled}
            />
        </Tabs>
    );
}
