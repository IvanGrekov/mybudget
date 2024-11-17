'use client';

import Chip from 'components/chip/Chip';
import styles from 'components/overall-balance/OverallBalance.module.scss';
import { useCalculateOverallBalance } from 'components/overall-balance/hooks/useCalculateOverallBalance';
import Tooltip from 'components/tooltip/Tooltip';
import { useIsScreenSize } from 'hooks/screenSize.hooks';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { EScreenSizeNames } from 'types/screenSizeNames';

interface IOverallBalanceProps {
    userCurrency: UserDefaultCurrencyEnum;
}

export default function OverallBalance({
    userCurrency,
}: IOverallBalanceProps): JSX.Element | null {
    const isMobile = useIsScreenSize(EScreenSizeNames.XS);

    const { overallBalance, isLoading } =
        useCalculateOverallBalance(userCurrency);

    if (isLoading || typeof overallBalance !== 'number') {
        return null;
    }

    const value = `${overallBalance} ${userCurrency}`;
    const fullTitle = `Overall Balance: ${value}`;
    const title = isMobile ? value : fullTitle;

    return (
        <div className={styles.container}>
            <Tooltip position="bottom" text={fullTitle}>
                <Chip
                    title={title}
                    variant="outlined"
                    size="big"
                    titleVariant="subtitle1"
                />
            </Tooltip>
        </div>
    );
}
