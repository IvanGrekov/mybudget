'use client';

import { useTranslations } from 'next-intl';

import UaFlagIcon from 'components/icons/UaFlagIcon';
import UkFlagIcon from 'components/icons/UkFlagIcon';
import styles from 'components/language-switcher/LanguageSwitcher.module.scss';
import { useUserLanguageValue } from 'components/language-switcher/hooks/useUserLanguageValue';
import Switcher, { ISwitcherProps } from 'components/switcher/Switcher';
import { PRIMARY_LOCALE } from 'constants/locales';

export default function LanguageSwitcher({
    tooltipPosition,
}: Pick<ISwitcherProps, 'tooltipPosition'>): JSX.Element | null {
    const t = useTranslations('SwitcherActionTitles');
    const { value, toggleValue } = useUserLanguageValue();

    return (
        <Switcher
            tooltipText={t('change-language')}
            tooltipPosition={tooltipPosition}
            isShifted={value !== PRIMARY_LOCALE}
            onClick={toggleValue}
        >
            <UkFlagIcon className={styles.icon} />
            <UaFlagIcon className={styles.icon} />
        </Switcher>
    );
}
