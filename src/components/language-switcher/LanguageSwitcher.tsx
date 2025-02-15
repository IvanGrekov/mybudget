'use client';

import UaFlagIcon from 'components/icons/UaFlagIcon';
import UkFlagIcon from 'components/icons/UkFlagIcon';
import styles from 'components/language-switcher/LanguageSwitcher.module.scss';
import { useUserLanguageValue } from 'components/language-switcher/hooks/useUserLanguageValue';
import Switcher, { ISwitcherProps } from 'components/switcher/Switcher';
import { PRIMARY_LOCALE } from 'constants/locales';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

export default function LanguageSwitcher({
    tooltipPosition = 'bottom',
}: Partial<Pick<ISwitcherProps, 'tooltipPosition'>>): JSX.Element | null {
    const [tooltipText] = useGetFeatureTranslations({
        featureName: 'SwitcherActionTitles',
        keys: ['change_language'],
    });
    const { value, toggleValue } = useUserLanguageValue();

    return (
        <Switcher
            tooltipText={tooltipText}
            tooltipPosition={tooltipPosition}
            isShifted={value !== PRIMARY_LOCALE}
            onClick={toggleValue}
        >
            <UkFlagIcon className={styles.icon} />
            <UaFlagIcon className={styles.icon} />
        </Switcher>
    );
}
