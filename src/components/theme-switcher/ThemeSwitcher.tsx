'use client';

import MoonIcon from 'components/icons/MoonIcon';
import SunIcon from 'components/icons/SunIcon';
import Switcher, { ISwitcherProps } from 'components/switcher/Switcher';
import styles from 'components/theme-switcher/ThemeSwitcher.module.scss';
import { useUserThemeValue } from 'components/theme-switcher/hooks/useUserThemeValue';
import { useGetFeatureTranslations } from 'hooks/useGetFeatureTranslations';
import { ETheme } from 'types/theme';

export default function ThemeSwitcher({
    tooltipPosition,
}: Pick<ISwitcherProps, 'tooltipPosition'>): JSX.Element | null {
    const [tooltipText] = useGetFeatureTranslations({
        featureName: 'SwitcherActionTitles',
        keys: ['change-theme'],
    });
    const result = useUserThemeValue();

    if (!result) {
        return null;
    }

    const { value, toggleValue } = result;

    return (
        <Switcher
            tooltipText={tooltipText}
            tooltipPosition={tooltipPosition}
            isShifted={value === ETheme.DARK}
            onClick={toggleValue}
        >
            <SunIcon className={styles.icon} />
            <MoonIcon className={styles.icon} />
        </Switcher>
    );
}
