import BackButton from 'components/back-button/BackButton';
import HeaderChip from 'components/header-chip/HeaderChip';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import { useAccountListCurrentTab } from 'features/account-list-tabs/hooks/useAccountListCurrentTab';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

interface IAccountReorderingListHeaderProps {
    isBackButtonDisabled?: boolean;
}

export default function AccountReorderingListHeader({
    isBackButtonDisabled,
}: IAccountReorderingListHeaderProps): JSX.Element {
    const type = useAccountListCurrentTab();
    const [title] = useGetFeatureTranslations({
        featureName: 'ReorderAccountsPage',
    });

    return (
        <div className={styles.header}>
            <BackButton
                href={`${EAppRoutes.Accounts}?${TAB_PARAM_NAME}=${type}`}
                isDisabled={isBackButtonDisabled}
            />
            <HeaderChip title={title} />
        </div>
    );
}
