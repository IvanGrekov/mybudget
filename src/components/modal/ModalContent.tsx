import cx from 'classnames';
import { FocusTrap } from 'focus-trap-react';

import styles from 'components/modal/Modal.module.scss';
import ModalActions from 'components/modal/ModalActions';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import ModalLoader from 'components/modal/ModalLoader';
import ModalTitle from 'components/modal/ModalTitle';
import { TModalProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';

export default function ModalContent({
    isOpen,
    title,
    children,
    isConfirmationModal,
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
                    [styles['modal--confirmation']]: isConfirmationModal,
                    [styles['modal--open']]: isOpen,
                })}
            >
                <div
                    className={cx(
                        styles['content-wrapper'],
                        styles[`content-wrapper--${size}`],
                        className,
                    )}
                    onClick={(event): void => {
                        event.stopPropagation();
                    }}
                    style={style}
                >
                    <ModalTitle
                        isOpen={isOpen}
                        text={title}
                        onClose={onClose}
                    />

                    <div
                        className={cx(styles.content, {
                            [styles['content--open']]: isOpen,
                        })}
                    >
                        {isOpen ? <>{children}</> : <ModalCircularLoading />}

                        <Show when={!!actions}>
                            <ModalActions>{actions}</ModalActions>
                        </Show>

                        <ModalLoader isLoading={isLoading} />
                    </div>
                </div>
            </dialog>
        </FocusTrap>
    );
}
