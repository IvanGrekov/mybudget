import styles from 'components/back-button/BackButton.module.scss';
import IconButton from 'components/button/IconButton';
import ArrowIcon from 'components/icons/ArrowIcon';

interface IBackButtonProps {
    href: string;
    isDisabled?: boolean;
}

export default function BackButton({
    href,
    isDisabled,
}: IBackButtonProps): JSX.Element {
    return (
        <IconButton
            Icon={ArrowIcon}
            title="Go Back"
            href={href}
            isDisabled={isDisabled}
            className={styles.button}
        />
    );
}
