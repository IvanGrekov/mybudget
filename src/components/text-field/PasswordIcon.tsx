import { Dispatch, SetStateAction, MouseEvent } from 'react';

import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import EyeIcon from 'components/icons/EyeIcon';
import HiddenEyeIcon from 'components/icons/HiddenEyeIcon';
import styles from 'components/text-field/TextField.module.scss';
import { TTextFieldProps } from 'components/text-field/types/textField.types';

type TIconProps = Pick<TTextFieldProps, 'type' | 'disabled' | 'error'> & {
    isValueVisible: boolean;
    setIsValueVisible: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordIcon({
    type,
    isValueVisible,
    error,
    disabled,
    setIsValueVisible,
}: TIconProps): JSX.Element | null {
    if (type !== 'password') {
        return null;
    }

    const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsValueVisible((prev) => !prev);
    };

    const title = isValueVisible ? 'Hide password' : 'Show password';
    const Icon = isValueVisible ? HiddenEyeIcon : EyeIcon;

    return (
        <IconButton
            iconSize={30}
            Icon={Icon}
            title={title}
            className={cx(styles['password-icon'], styles.icon, {
                [styles['icon--error']]: error,
                [styles['icon--disabled']]: disabled,
            })}
            onClick={onClick}
        />
    );
}
