import CardContent from 'components/card/CardContent';
import EntityIcon from 'components/entity-icon/EntityIcon';
import ArrowIcon from 'components/icons/ArrowIcon';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/transaction-card/TransactionCard.module.scss';
import { getFromToItemHref } from 'features/transaction-list/components/transaction-card/utils/getFromToItemHref';
import { Transaction } from 'types/generated.types';

interface ITransactionCardContentProps {
    transaction: Transaction;
}

export default function TransactionCardContent({
    transaction,
}: ITransactionCardContentProps): JSX.Element {
    const { fromAccount, fromCategory, toAccount, toCategory } = transaction;

    const fromEntityIconName = fromAccount?.iconName || fromCategory?.iconName;
    const fromEntityIconColor =
        fromAccount?.iconColor || fromCategory?.iconColor;
    const fromEntityName = fromAccount?.name || fromCategory?.name;

    const toEntityIconName = toAccount?.iconName || toCategory?.iconName;
    const toEntityIconColor = toAccount?.iconColor || toCategory?.iconColor;
    const toEntityName = toAccount?.name || toCategory?.name;

    return (
        <CardContent>
            <div className={styles['from-to-details-wrapper']}>
                <Link
                    href={getFromToItemHref({
                        id: fromAccount?.id || fromCategory?.id,
                        isCategory: !!fromCategory,
                    })}
                    target="_blank"
                    className={styles['from-to-item-details-wrapper']}
                >
                    <EntityIcon
                        iconName={fromEntityIconName}
                        iconColor={fromEntityIconColor}
                        isCategory={!!fromCategory}
                        size={EIconSizes.medium}
                    />
                    <Typography variant="subtitle2">
                        {fromEntityName}
                    </Typography>
                </Link>

                <ArrowIcon wrapperClassName={styles['arrow-icon-wrapper']} />

                <Link
                    href={getFromToItemHref({
                        id: toAccount?.id || toCategory?.id,
                        isCategory: !!toCategory,
                    })}
                    className={styles['from-to-item-details-wrapper']}
                >
                    <EntityIcon
                        iconName={toEntityIconName}
                        iconColor={toEntityIconColor}
                        isCategory={!!toCategory}
                        size={EIconSizes.medium}
                    />
                    <Typography variant="subtitle2">{toEntityName}</Typography>
                </Link>
            </div>
        </CardContent>
    );
}
