import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import { AccountTypeEnum } from 'types/generated.types';

interface IAccountListTabsProps {
    isDisabled?: boolean;
}

export default function AccountListTabs({
    isDisabled,
}: IAccountListTabsProps): JSX.Element {
    return (
        <Tabs>
            <Tab
                value={AccountTypeEnum.REGULAR}
                label="Regular"
                isDisabled={isDisabled}
            />

            <Tab
                value={AccountTypeEnum.SAVINGS}
                label="Savings"
                isDisabled={isDisabled}
            />

            <Tab
                value={AccountTypeEnum.I_OWE}
                label="I owe"
                isDisabled={isDisabled}
            />

            <Tab
                value={AccountTypeEnum.OWE_ME}
                label="Owe me"
                isDisabled={isDisabled}
            />
        </Tabs>
    );
}
