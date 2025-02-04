import cx from 'classnames';

import EntityIcon from 'components/entity-icon/EntityIcon';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import UpdatedBalanceDetails from 'features/transaction-list/components/from-to-transaction-details/UpdatedBalanceDetails';
import { getFromToItemHref } from 'features/transaction-list/components/from-to-transaction-details/utils/getFromToItemHref';
import { AccountCurrencyEnum } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IFromToTransactionDetailsItemProps {
    isArchived?: boolean;
    id?: number;
    isCategory: boolean;
    iconName?: Maybe<string>;
    iconColor?: Maybe<string>;
    name?: string;
    shouldShowUpdatedBalances?: boolean;
    accountUpdatedBalance?: Maybe<number>;
    accountCurrency?: AccountCurrencyEnum;
}

export default function FromToTransactionDetailsItem({
    isArchived,
    id,
    isCategory,
    iconName,
    iconColor,
    name,
    shouldShowUpdatedBalances,
    accountUpdatedBalance,
    accountCurrency,
}: IFromToTransactionDetailsItemProps): JSX.Element {
    if (isArchived) {
        return (
            <div className={styles['from-to-item-link-wrapper']}>
                <FromToEntityDetails
                    isArchived={isArchived}
                    isCategory={isCategory}
                    iconName={iconName}
                    iconColor={iconColor}
                    name={name}
                />

                <FromToEntityUpdatedBalanceDetails
                    shouldShowUpdatedBalances={shouldShowUpdatedBalances}
                    accountUpdatedBalance={accountUpdatedBalance}
                    accountCurrency={accountCurrency}
                />
            </div>
        );
    }

    return (
        <div className={styles['from-to-item-link-wrapper']}>
            <Link
                href={getFromToItemHref({
                    id,
                    isCategory,
                })}
                target="_blank"
                className={styles['from-to-item-link']}
            >
                <FromToEntityDetails
                    isCategory={isCategory}
                    iconName={iconName}
                    iconColor={iconColor}
                    name={name}
                />
            </Link>

            <FromToEntityUpdatedBalanceDetails
                shouldShowUpdatedBalances={shouldShowUpdatedBalances}
                accountUpdatedBalance={accountUpdatedBalance}
                accountCurrency={accountCurrency}
            />
        </div>
    );
}

function FromToEntityDetails({
    isArchived,
    isCategory,
    iconName,
    iconColor,
    name,
}: Pick<
    IFromToTransactionDetailsItemProps,
    'isArchived' | 'iconName' | 'iconColor' | 'isCategory' | 'name'
>): JSX.Element {
    return (
        <div className={styles['from-to-entity-details']}>
            <EntityIcon
                iconName={iconName}
                iconColor={iconColor}
                isCategory={!!isCategory}
                size={EIconSizes.medium}
            />
            <Typography
                variant="subtitle2"
                className={cx({
                    [styles['from-to-entity-name--archived']]: isArchived,
                })}
            >
                {name}
            </Typography>
        </div>
    );
}

function FromToEntityUpdatedBalanceDetails({
    shouldShowUpdatedBalances,
    accountUpdatedBalance,
    accountCurrency,
}: Pick<
    IFromToTransactionDetailsItemProps,
    'shouldShowUpdatedBalances' | 'accountUpdatedBalance' | 'accountCurrency'
>): JSX.Element | null {
    if (
        !shouldShowUpdatedBalances ||
        typeof accountUpdatedBalance !== 'number' ||
        !accountCurrency
    ) {
        return null;
    }

    return (
        <UpdatedBalanceDetails
            value={accountUpdatedBalance}
            currency={accountCurrency}
        />
    );
}
