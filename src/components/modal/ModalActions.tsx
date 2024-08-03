import { PropsWithChildren } from 'react';

import ButtonGroup from 'components/button-group/ButtonGroup';
import styles from 'components/modal/Modal.module.scss';

export default function ModalActions({
    children,
}: PropsWithChildren): JSX.Element | null {
    if (!children) {
        return null;
    }

    return <ButtonGroup className={styles.actions}>{children}</ButtonGroup>;
}
