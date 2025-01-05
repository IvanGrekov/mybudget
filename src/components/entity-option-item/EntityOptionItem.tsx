import EntityIcon from 'components/entity-icon/EntityIcon';
import styles from 'components/entity-option-item/EntityOptionItem.module.scss';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Typography from 'components/typography/Typography';
import { Maybe } from 'types/utility.types';
import { roundValue } from 'utils/roundValue';

interface IEntityOptionItemProps {
    name: string;
    balance?: number;
    currency?: string;
    iconName?: Maybe<string>;
    iconColor?: Maybe<string>;
    isCategory?: boolean;
}

export default function EntityOptionItem({
    name,
    balance,
    currency,
    iconName,
    iconColor,
    isCategory,
}: IEntityOptionItemProps): JSX.Element {
    const shouldShowBalance = typeof balance === 'number' && !!currency;
    const shouldShowCurrencyOnly = typeof balance === 'undefined' && !!currency;

    return (
        <div className={styles.container}>
            <EntityIcon
                iconName={iconName}
                iconColor={iconColor}
                isCategory={isCategory}
                size={EIconSizes.extraSmall}
            />

            <div className={styles.details}>
                <Typography>{name}</Typography>

                {shouldShowBalance && (
                    <Typography
                        variant="caption"
                        className={styles.caption}
                    >{`${roundValue(balance)} ${currency}`}</Typography>
                )}

                {shouldShowCurrencyOnly && (
                    <Typography variant="caption" className={styles.caption}>
                        Currency: {currency}
                    </Typography>
                )}
            </div>
        </div>
    );
}
