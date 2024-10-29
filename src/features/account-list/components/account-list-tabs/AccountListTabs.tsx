import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import { AccountTypeEnum } from 'types/generated.types';

export default function AccountListTabs(): JSX.Element {
    return (
        <Tabs>
            <Tab value={AccountTypeEnum.REGULAR} label="Regular" />

            <Tab value={AccountTypeEnum.SAVINGS} label="Savings" />

            <Tab value={AccountTypeEnum.I_OWE} label="I owe" />

            <Tab value={AccountTypeEnum.OWE_ME} label="Owe me" />
        </Tabs>
    );
}
