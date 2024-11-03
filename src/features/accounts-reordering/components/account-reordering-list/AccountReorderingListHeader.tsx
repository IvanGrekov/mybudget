import BackButton from 'components/back-button/BackButton';
import HeaderChip from 'components/header-chip/HeaderChip';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

export default function AccountReorderingListHeader(): JSX.Element {
    return (
        <div className={styles.header}>
            <BackButton href={EAppRoutes.Accounts} />
            <HeaderChip title="Accounts Reordering" />
        </div>
    );
}
