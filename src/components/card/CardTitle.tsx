import Typography from 'components/typography/Typography';

interface ICardTitleProps {
    title: string;
}

export default function CardTitle({ title }: ICardTitleProps): JSX.Element {
    return (
        <Typography variant="subtitle2" element="h3">
            {title}
        </Typography>
    );
}
