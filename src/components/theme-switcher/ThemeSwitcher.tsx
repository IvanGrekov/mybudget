'use client';

import { useTranslations } from 'next-intl';

import MoonIcon from 'components/icons/MoonIcon';
import SunIcon from 'components/icons/SunIcon';
import Switcher, { ISwitcherProps } from 'components/switcher/Switcher';
import styles from 'components/theme-switcher/ThemeSwitcher.module.scss';
import { useUserThemeValue } from 'components/theme-switcher/hooks/useUserThemeValue';
import { ETheme } from 'types/theme';

export default function ThemeSwitcher({
    tooltipPosition,
}: Pick<ISwitcherProps, 'tooltipPosition'>): JSX.Element | null {
    const t = useTranslations('SwitcherActionTitles');
    const result = useUserThemeValue();

    if (!result) {
        return null;
    }

    const { value, toggleValue } = result;

    return (
        <Switcher
            tooltipText={t('change-theme')}
            tooltipPosition={tooltipPosition}
            isShifted={value === ETheme.DARK}
            onClick={toggleValue}
        >
            <SunIcon className={styles.icon} />
            <MoonIcon className={styles.icon} />
        </Switcher>
    );
}
