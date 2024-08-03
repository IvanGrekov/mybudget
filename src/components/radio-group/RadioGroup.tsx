import cx from 'classnames';

import InputContainer from 'components/input-container/InputContainer';
import InputLabelRequiredMark from 'components/input-label-required-mark/InputLabelRequiredMark';
import styles from 'components/radio-group/RadioGroup.module.scss';
import { TRadioGroupProps } from 'components/radio-group/types/radioGroup.props';
import { passDisableAndErrorPropsToChildren } from 'components/radio-group/utils/passDisableAndErrorPropsToChildren';
import Typography from 'components/typography/Typography';

export default function RadioGroup({
    children,
    title,
    error,
    required,
    disabled,
    containerClassName,
    errorClassName,
    titleClassName,
    className,
}: TRadioGroupProps): JSX.Element {
    const formattedChildren = passDisableAndErrorPropsToChildren({
        children,
        disabled,
        error,
    });

    return (
        <InputContainer
            error={error}
            disabled={disabled}
            className={cx(styles.container, containerClassName)}
            errorClassName={errorClassName}
        >
            <div
                className={cx(styles['title-wrapper'], {
                    [styles['title-wrapper--error']]: error,
                    [styles['title-wrapper--disabled']]: disabled,
                })}
            >
                {title && (
                    <Typography
                        variant="body1"
                        className={cx(styles.title, titleClassName)}
                    >
                        {title}
                    </Typography>
                )}

                <InputLabelRequiredMark
                    required={required}
                    disabled={disabled}
                />
            </div>

            <div className={cx(styles.group, className)}>
                {formattedChildren}
            </div>
        </InputContainer>
    );
}
