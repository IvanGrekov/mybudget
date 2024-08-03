import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import styles from 'components/radio/Radio.module.scss';
import { useRadio } from 'components/radio/hooks/useRadio';
import { IRadioProps } from 'components/radio/types/radio.props';
import { getIcon } from 'components/radio/utils/radio.utils';
import Typography from 'components/typography/Typography';
import {
    INPUT_LABEL_TYPOGRAPHY_VARIANT,
    INPUT_ICON_SIZE,
} from 'constants/input.constants';

export default function Radio({
    name,
    value,
    label,
    error,
    disabled,
    typographyVariant = INPUT_LABEL_TYPOGRAPHY_VARIANT,
    labelClassName,
    className,
    onFocus,
    onBlur,
    onChange,
    ...rest
}: IRadioProps): JSX.Element {
    const {
        inputRef,
        buttonRef,
        labelRef,
        isChecked,
        isActive,
        onInputFocus,
        onInputBlur,
        onInputChange,
        onLabelMouseEnter,
        onLabelMouseLeave,
        onButtonClick,
    } = useRadio({
        name,
        value,
        onFocus,
        onBlur,
        onChange,
    });

    return (
        <label
            ref={labelRef}
            onMouseEnter={onLabelMouseEnter}
            onMouseLeave={onLabelMouseLeave}
            tabIndex={disabled ? -1 : 0}
            className={cx(
                styles.label,
                {
                    [styles['label--error']]: error,
                    [styles['label--disabled']]: disabled,
                },
                labelClassName,
            )}
        >
            <input
                ref={inputRef}
                type="radio"
                name={name}
                value={value}
                disabled={disabled}
                className={cx(styles.input)}
                {...rest}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
            />

            <IconButton
                ref={buttonRef}
                Icon={getIcon(isChecked)}
                isActive={isActive}
                isDisabled={disabled}
                iconSize={INPUT_ICON_SIZE}
                tabIndex={-1}
                className={cx(styles.radio, className)}
                onClick={onButtonClick}
            />

            <Typography variant={typographyVariant}>{label}</Typography>
        </label>
    );
}
