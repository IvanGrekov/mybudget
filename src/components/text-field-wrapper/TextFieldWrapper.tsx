import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/text-field-wrapper/TextFieldWrapper.module.scss';

interface ITextFieldWrapperProps extends PropsWithChildren {
    disabled?: boolean;
    className?: string;
}

export default function TextFieldWrapper({
    children,
    disabled,
    className,
}: ITextFieldWrapperProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.wrapper,
                {
                    [styles['wrapper--disabled']]: disabled,
                },
                className,
            )}
        >
            {children}
        </div>
    );
}
