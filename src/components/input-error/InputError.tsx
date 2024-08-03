import Typography from 'components/typography/Typography';
import { IInputErrorProps } from 'types/input.types';

export default function InputError({
    error,
    disabled,
    className,
}: IInputErrorProps): JSX.Element | null {
    if (!error || disabled) {
        return null;
    }

    return (
        <Typography element="p" variant="caption" className={className}>
            {error}
        </Typography>
    );
}
