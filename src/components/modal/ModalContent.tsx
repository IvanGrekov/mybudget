import cx from 'classnames';
import FocusTrap from 'focus-trap-react';

import styles from 'components/modal/Modal.module.scss';
import ModalActions from 'components/modal/ModalActions';
import ModalLoader from 'components/modal/ModalLoader';
import ModalTitle from 'components/modal/ModalTitle';
import { TModalProps } from 'components/modal/types/modalProps';

export default function ModalContent({
    isOpen,
    title,
    children,
    actions,
    size = 'small',
    isLoading,
    style,
    className,
    onClose,
}: TModalProps): JSX.Element {
    return (
        <FocusTrap active={isOpen}>
            <dialog
                onClick={onClose}
                className={cx(styles.modal, {
                    [styles['modal--open']]: isOpen,
                })}
            >
                <div
                    className={cx(
                        styles.content,
                        styles[`content--${size}`],
                        className,
                    )}
                    onClick={(event): void => {
                        event.stopPropagation();
                    }}
                    style={style}
                >
                    <ModalTitle text={title} />

                    {children}

                    <ModalActions>{actions}</ModalActions>

                    <ModalLoader isLoading={isLoading} />
                </div>
            </dialog>
        </FocusTrap>
    );
}
