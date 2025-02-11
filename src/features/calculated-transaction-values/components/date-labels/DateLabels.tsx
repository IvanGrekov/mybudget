import Typography from 'components/typography/Typography';

interface IDateLabelsProps {
    fromDateLabel?: string;
    toDateLabel?: string;
}

export default function DateLabels({
    fromDateLabel,
    toDateLabel,
}: IDateLabelsProps): JSX.Element | null {
    if (!fromDateLabel || !toDateLabel) {
        return null;
    }

    if (fromDateLabel === toDateLabel) {
        return <Typography>{fromDateLabel}</Typography>;
    }

    return <Typography>{`${fromDateLabel} - ${toDateLabel}`}</Typography>;
}
