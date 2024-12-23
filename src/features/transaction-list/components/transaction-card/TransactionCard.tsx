// import Button from 'components/button/Button';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Chip from 'components/chip/Chip';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/transaction-card/TransactionCard.module.scss';
import TransactionCardContent from 'features/transaction-list/components/transaction-card/TransactionCardContent';
import { getColorForTypeChip } from 'features/transaction-list/components/transaction-card/utils/getColorForTypeChip';
import { Transaction } from 'types/generated.types';
import { getTime } from 'utils/date.utils';
import { getCapitalizedString } from 'utils/string.utils';

const CHIP_TITLE_VARIANT = 'body2';
const CHIP_SIZE = 'small';

interface ITransactionCardProps {
    transaction: Transaction;
}

export default function TransactionCard({
    transaction,
}: ITransactionCardProps): JSX.Element {
    const { type, createdAt, value, currency, fee } = transaction;

    return (
        <Card>
            <CardHeader
                title={
                    <div className={styles['header-title-wrapper']}>
                        <div className={styles['header-labels']}>
                            <Chip
                                title={getTime(createdAt)}
                                size={CHIP_SIZE}
                                titleVariant={CHIP_TITLE_VARIANT}
                            />

                            <Chip
                                title={getCapitalizedString(type, '_')}
                                size={CHIP_SIZE}
                                titleVariant={CHIP_TITLE_VARIANT}
                                color={getColorForTypeChip(type)}
                            />
                        </div>

                        <CardTitle title={`${value} ${currency}`} />

                        {fee && (
                            <Typography variant="body2" className={styles.fee}>
                                Fee: {`${fee} ${currency}`}
                            </Typography>
                        )}
                    </div>
                }
                // actions={
                //     <BaseEntityMenu
                //         detailsPath={`${EAppRoutes.TransactionCategories}/${id}`}
                //         openEditModal={openEditAccountModal}
                //         openChangeCurrencyModal={openChangeCurrencyModal}
                //         openDeleteModal={openDeleteModal}
                //     />
                // }
            />

            <TransactionCardContent transaction={transaction} />
        </Card>
    );
}
