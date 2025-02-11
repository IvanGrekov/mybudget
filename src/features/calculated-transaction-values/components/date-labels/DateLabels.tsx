import Typography from 'components/typography/Typography';

interface IDateLabelsProps {
    fromDateLabel?: string;
    toDateLabel?: string;
    className?: string;
}

export default function DateLabels({
    fromDateLabel,
    toDateLabel,
    className,
}: IDateLabelsProps): JSX.Element | null {
    if (!fromDateLabel || !toDateLabel) {
        return null;
    }

    if (fromDateLabel === toDateLabel) {
        return <Typography>{fromDateLabel}</Typography>;
    }

    return (
        <Typography
            className={className}
        >{`${fromDateLabel} - ${toDateLabel}`}</Typography>
    );
}
