import cx from 'classnames';

import styles from 'components/select/Select.module.scss';
import SelectValuePreview from 'components/select/SelectValuePreview';
import {
    TSelectProps,
    TUseSelectFieldResult,
} from 'components/select/types/select.types';

type TCustomSelectProps<T> = Pick<
    TSelectProps<T>,
    | 'options'
    | 'value'
    | 'multiple'
    | 'error'
    | 'disabled'
    | 'className'
    | 'getOptionLabel'
    | 'onChange'
> &
    Pick<
        TUseSelectFieldResult<T>,
        | 'customSelectRef'
        | 'isOpen'
        | 'isFocused'
        | 'isOptionsFixed'
        | 'isFieldFilled'
    >;

export default function CustomSelect<T>({
    customSelectRef,
    isOpen,
    isFocused,
    isOptionsFixed,
    isFieldFilled,
    multiple,
    disabled,
    error,
    className,
    ...valuePreviewProps
}: TCustomSelectProps<T>): JSX.Element {
    return (
        <div
            ref={customSelectRef}
            className={cx(
                styles.select,
                {
                    [styles['select--focused']]: isFocused,
                    [styles['select--open']]: isOpen,
                    [styles['select--fixed-options']]: isOptionsFixed,
                    [styles['select--filled']]: isFieldFilled,
                    [styles['select--multiple']]: multiple,
                    [styles['select--disabled']]: disabled,
                    [styles['select--error']]: error,
                },
                className,
            )}
        >
            <div
                className={cx(styles['value-preview-wrapper'], {
                    [styles['value-preview-wrapper--multiple']]: multiple,
                })}
            >
                <SelectValuePreview {...valuePreviewProps} />
            </div>
        </div>
    );
}
