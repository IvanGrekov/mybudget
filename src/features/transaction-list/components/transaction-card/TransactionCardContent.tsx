import CardContent from 'components/card/CardContent';
import EntityIcon from 'components/entity-icon/EntityIcon';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/transaction-card/TransactionCard.module.scss';
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
                <EntityIcon
                    iconName={fromEntityIconName}
                    iconColor={fromEntityIconColor}
                    isCategory={!!fromCategory}
                    size={EIconSizes.large}
                />

                <div>
                    <Typography
                        variant="subtitle1"
                        style={{ marginBottom: '0.75rem' }}
                    >
                        {fromEntityName}
                    </Typography>

                    <div
                        className={styles['from-to-details-wrapper']}
                        style={{ gap: '0.75rem' }}
                    >
                        <EntityIcon
                            iconName={toEntityIconName}
                            iconColor={toEntityIconColor}
                            isCategory={!!toCategory}
                        />
                        <Typography variant="subtitle2">
                            {toEntityName}
                        </Typography>
                    </div>
                </div>
            </div>
        </CardContent>
    );
}
