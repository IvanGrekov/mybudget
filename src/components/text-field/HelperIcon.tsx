import cx from 'classnames';

import styles from 'components/text-field/TextField.module.scss';
import {
    TTextFieldProps,
    IUseTextFieldResult,
} from 'components/text-field/types/textField.types';
import { INPUT_HELPER_ICON_SIZE } from 'constants/input.constants';

type THelperIcon = Pick<
    TTextFieldProps,
    'error' | 'disabled' | 'iconSize' | 'Icon'
> &
    Pick<IUseTextFieldResult, 'id'>;

export default function HelperIcon({
    id,
    error,
    disabled,
    iconSize = INPUT_HELPER_ICON_SIZE,
    Icon,
}: THelperIcon): JSX.Element | null {
    if (!Icon) {
        return null;
    }

    return (
        <label
            htmlFor={id}
            className={cx(styles['icon'], styles['helper-icon'], {
                [styles['icon--error']]: error,
                [styles['icon--disabled']]: disabled,
            })}
        >
            <Icon size={iconSize} />
        </label>
    );
}
