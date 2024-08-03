import styles from 'components/input-label-required-mark/InputLabelRequiredMark.module.scss';
import Typography from 'components/typography/Typography';

interface IInputLabelRequiredMarkProps {
    required?: boolean;
    disabled?: boolean;
}

export default function InputLabelRequiredMark({
    required,
    disabled,
}: IInputLabelRequiredMarkProps): JSX.Element | null {
    if (!required || disabled) {
        return null;
    }

    return (
        <Typography element="span" variant="caption" className={styles.mark}>
            *
        </Typography>
    );
}
