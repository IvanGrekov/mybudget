import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

interface ICardTitleProps {
    title: string;
    titleVariant?: TTypographyVariants;
    className?: string;
    maxLength?: number;
}

export default function CardTitle({
    title,
    titleVariant = 'subtitle1',
    className,
    maxLength,
}: ICardTitleProps): JSX.Element {
    return (
        <Tooltip text={title}>
            <Typography
                variant={titleVariant}
                element="h3"
                lineClamp={1}
                className={className}
                maxLength={maxLength}
            >
                {title}
            </Typography>
        </Tooltip>
    );
}
