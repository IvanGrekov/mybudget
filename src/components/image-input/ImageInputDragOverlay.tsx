import cx from 'classnames';

import UploadIcon from 'components/icons/UploadIcon';
import styles from 'components/image-input/ImageInput.module.scss';

export default function ImageInputDragOverlay(): JSX.Element {
    return (
        <div className={cx(styles['drag-overlay'])}>
            <UploadIcon size="large" />
        </div>
    );
}
