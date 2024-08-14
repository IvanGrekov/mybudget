import { ISwitcherProps } from 'components/switcher/Switcher';
import ThemeSwitcher from 'components/theme-switcher/ThemeSwitcher';

export default function PreferencesSwitchers({
    tooltipPosition = 'bottom',
}: Partial<Pick<ISwitcherProps, 'tooltipPosition'>>): JSX.Element {
    return (
        <div>
            <ThemeSwitcher tooltipPosition={tooltipPosition} />
        </div>
    );
}
