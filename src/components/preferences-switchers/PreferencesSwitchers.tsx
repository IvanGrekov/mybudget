import LanguageSwitcher from 'components/language-switcher/LanguageSwitcher';
import styles from 'components/preferences-switchers/PreferencesSwitchers.module.scss';
import { ISwitcherProps } from 'components/switcher/Switcher';
import ThemeSwitcher from 'components/theme-switcher/ThemeSwitcher';

export default function PreferencesSwitchers({
    tooltipPosition = 'bottom',
}: Partial<Pick<ISwitcherProps, 'tooltipPosition'>>): JSX.Element {
    return (
        <div className={styles.preferencesSwitchers}>
            <ThemeSwitcher tooltipPosition={tooltipPosition} />
            <LanguageSwitcher tooltipPosition={tooltipPosition} />
        </div>
    );
}
