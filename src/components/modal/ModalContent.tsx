import { useTransition, animated } from '@react-spring/web';
import cx from 'classnames';
import { FocusTrap } from 'focus-trap-react';

import styles from 'components/modal/Modal.module.scss';
import ModalActions from 'components/modal/ModalActions';
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
    const transitions = useTransition(isOpen, {
        from: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0.5 },
    });

    return transitions((transitionsStyles, item) => (
        <Show when={item}>
            <FocusTrap active={isOpen}>
                <dialog
                    onClick={onClose}
                    className={cx(styles.modal, {
                        [styles['modal--confirmation']]: isConfirmationModal,
                        [styles['modal--open']]: isOpen,
                    })}
                >
                    <animated.div
                        className={cx(
                            styles['content-wrapper'],
                            styles[`content-wrapper--${size}`],
                            className,
                        )}
                        onClick={(event): void => {
                            event.stopPropagation();
                        }}
                        style={{
                            ...transitionsStyles,
                            ...style,
                        }}
                    >
                        <ModalTitle
                            isOpen={isOpen}
                            text={title}
                            onClose={onClose}
                        />

                        {children}

                        <Show when={!!actions}>
                            <ModalActions>{actions}</ModalActions>
                        </Show>

                        <ModalLoader isLoading={isLoading} />
                    </animated.div>
                </dialog>
            </FocusTrap>
        </Show>
    ));
}
