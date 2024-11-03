import styles from 'components/back-button/BackButton.module.scss';
import IconButton from 'components/button/IconButton';
import ArrowIcon from 'components/icons/ArrowIcon';

interface IBackButtonProps {
    href: string;
}

export default function BackButton({ href }: IBackButtonProps): JSX.Element {
    return (
        <IconButton
            Icon={ArrowIcon}
            title="Go Back"
            href={href}
            className={styles.button}
        />
    );
}
