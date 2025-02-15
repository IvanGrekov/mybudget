import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { AccountTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface IAccountListTabsProps {
    isDisabled?: boolean;
}

export default function AccountListTabs({
    isDisabled,
}: IAccountListTabsProps): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();

    return (
        <Tabs>
            <Tab
                value={AccountTypeEnum.REGULAR}
                label={getCapitalizedEnumValue(
                    AccountTypeEnum.REGULAR,
                    entityNameTranslations,
                )}
                isDisabled={isDisabled}
            />

            <Tab
                value={AccountTypeEnum.SAVINGS}
                label={getCapitalizedEnumValue(
                    AccountTypeEnum.SAVINGS,
                    entityNameTranslations,
                )}
                isDisabled={isDisabled}
            />

            <Tab
                value={AccountTypeEnum.I_OWE}
                label={getCapitalizedEnumValue(
                    AccountTypeEnum.I_OWE,
                    entityNameTranslations,
                )}
                isDisabled={isDisabled}
            />

            <Tab
                value={AccountTypeEnum.OWE_ME}
                label={getCapitalizedEnumValue(
                    AccountTypeEnum.OWE_ME,
                    entityNameTranslations,
                )}
                isDisabled={isDisabled}
            />
        </Tabs>
    );
}
