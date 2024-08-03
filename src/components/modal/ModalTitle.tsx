import { PropsWithChildren } from 'react';

import styles from 'components/modal/Modal.module.scss';
import Typography from 'components/typography/Typography';

export default function ModalTitle({
    children,
}: PropsWithChildren): JSX.Element | null {
    if (!children) {
        return null;
    }

    return (
        <Typography variant="subtitle1" className={styles.title}>
            {children}
        </Typography>
    );
}
