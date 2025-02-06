import cx from 'classnames';

import EntityIcon from 'components/entity-icon/EntityIcon';
import styles from 'components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import UpdatedBalanceDetails from 'components/from-to-transaction-details/UpdatedBalanceDetails';
import { getFromToItemHref } from 'components/from-to-transaction-details/utils/getFromToItemHref';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { AccountCurrencyEnum } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IFromToTransactionDetailsItemProps {
    isDisabled?: boolean;
    isActive?: boolean;
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
    isDisabled,
    isActive,
    id,
    isCategory,
    iconName,
    iconColor,
    name,
    shouldShowUpdatedBalances,
    accountUpdatedBalance,
    accountCurrency,
}: IFromToTransactionDetailsItemProps): JSX.Element {
    if (isDisabled) {
        return (
            <div className={styles['from-to-item-link-wrapper']}>
                <FromToEntityDetails
                    isDisabled={isDisabled}
                    isActive={isActive}
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
                isActive={isActive}
                target={isActive ? undefined : '_blank'}
                className={styles['from-to-item-link']}
            >
                <FromToEntityDetails
                    isActive={isActive}
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
    isDisabled,
    isActive,
    isCategory,
    iconName,
    iconColor,
    name,
}: Pick<
    IFromToTransactionDetailsItemProps,
    'isDisabled' | 'isActive' | 'iconName' | 'iconColor' | 'isCategory' | 'name'
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
                    [styles['from-to-entity-name--disabled']]: isDisabled,
                    [styles['from-to-entity-name--active']]: isActive,
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
