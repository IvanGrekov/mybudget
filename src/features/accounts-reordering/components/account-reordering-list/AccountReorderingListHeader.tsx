import BackButton from 'components/back-button/BackButton';
import HeaderChip from 'components/header-chip/HeaderChip';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

interface IAccountReorderingListHeaderProps {
    isBackButtonDisabled?: boolean;
}

export default function AccountReorderingListHeader({
    isBackButtonDisabled,
}: IAccountReorderingListHeaderProps): JSX.Element {
    return (
        <div className={styles.header}>
            <BackButton
                href={EAppRoutes.Accounts}
                isDisabled={isBackButtonDisabled}
            />
            <HeaderChip title="Accounts Reordering" />
        </div>
    );
}
