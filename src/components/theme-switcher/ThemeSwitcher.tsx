'use client';

import cx from 'classnames';
import { useTranslations } from 'next-intl';

import MoonIcon from 'components/icons/MoonIcon';
import SunIcon from 'components/icons/SunIcon';
import styles from 'components/theme-switcher/ThemeSwitcher.module.scss';
import { useUserThemeValue } from 'components/theme-switcher/hooks/useUserThemeValue';
import Tooltip from 'components/tooltip/Tooltip';
import { TTooltipPosition } from 'components/tooltip/types/tooltipProps';
import { ETheme } from 'types/theme';

interface IThemeSwitcherProps {
    tooltipPosition?: TTooltipPosition;
}

export default function ThemeSwitcher({
    tooltipPosition = 'bottom',
}: IThemeSwitcherProps): JSX.Element | null {
    const t = useTranslations('SwitcherActionTitles');

    const result = useUserThemeValue();

    if (!result) {
        return null;
    }

    const { localStorageValue, setLocalStorageValue } = result;
    const isDarkTheme = localStorageValue === ETheme.DARK;

    const onClick = (): void => {
        setLocalStorageValue((prevValue) =>
            prevValue === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT,
        );
    };

    return (
        <Tooltip text={t('change-theme')} position={tooltipPosition}>
            <button className={styles.container} onClick={onClick}>
                <SunIcon className={styles.icon} />
                <MoonIcon className={styles.icon} />

                <span
                    className={cx(styles.switcher, {
                        [styles['switcher--shifted']]: isDarkTheme,
                    })}
                />
            </button>
        </Tooltip>
    );
}
