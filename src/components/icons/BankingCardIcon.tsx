import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';
import { EIconSizes } from 'components/icons/types/iconSizes';

export default function BankingCardIcon({
    size = EIconSizes.small,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    const formattedSize = typeof size === 'number' ? size * 1.1 : size;

    return (
        <IconWrapper size={formattedSize} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="168"
                height="168"
                viewBox="0 0 168 168"
                fill="none"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.5723 55.7681C17.5723 46.1431 25.3748 38.3406 34.9998 38.3406H132.594C142.219 38.3406 150.021 46.1432 150.021 55.7681V111.536C150.021 121.161 142.219 128.964 132.594 128.964H34.9998C25.3749 128.964 17.5723 121.161 17.5723 111.536V90.6231C17.5723 88.6982 19.1328 87.1376 21.0578 87.1376C22.9828 87.1376 24.5433 88.6982 24.5433 90.6231V111.536C24.5433 117.311 29.2248 121.993 34.9998 121.993H132.594C138.369 121.993 143.05 117.311 143.05 111.536V55.7681C143.05 49.9931 138.369 45.3116 132.594 45.3116H34.9998C29.2248 45.3116 24.5433 49.9931 24.5433 55.7681V66.2246H125.623C127.548 66.2246 129.108 67.7851 129.108 69.7101C129.108 71.6351 127.548 73.1956 125.623 73.1956H21.0578C19.1328 73.1956 17.5723 71.6351 17.5723 69.7101V55.7681Z"
                />
            </svg>
        </IconWrapper>
    );
}
