import styles from 'components/card/Card.module.scss';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

interface ICardTitleProps {
    title: string;
    variant?: TTypographyVariants;
    className?: string;
    maxLength?: number;
}

export default function CardTitle({
    title,
    variant = 'subtitle1',
    className,
    maxLength,
}: ICardTitleProps): JSX.Element {
    return (
        <Tooltip text={title} wrapperClassName={styles.title}>
            <Typography
                variant={variant}
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
