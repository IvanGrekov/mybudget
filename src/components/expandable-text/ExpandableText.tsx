import Typography from 'components/typography/Typography';

interface IExpandableTextProps {
    isOverflow: boolean;
    isExpanded: boolean;
    text: string;
}

export default function ExpandableText({
    isOverflow,
    isExpanded,
    text,
}: IExpandableTextProps): JSX.Element {
    return (
        <Typography
            style={{
                overflow: isOverflow ? 'hidden' : 'visible',
                display: '-webkit-box',
                WebkitLineClamp: isOverflow && isExpanded ? 'none' : 1,
                WebkitBoxOrient: 'vertical',
            }}
        >
            {text}
        </Typography>
    );
}
