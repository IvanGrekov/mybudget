import cx from 'classnames';

import styles from 'components/under-development-message/UnderDevelopmentMessage.module.scss';
import WarningMessage from 'components/warning-message/WarningMessage';

interface IUnderDevelopmentMessageProps {
    className?: string;
}

export default function UnderDevelopmentMessage({
    className,
}: IUnderDevelopmentMessageProps): JSX.Element {
    return (
        <WarningMessage
            message="This feature is under development."
            className={cx(styles.container, className)}
        />
    );
}
