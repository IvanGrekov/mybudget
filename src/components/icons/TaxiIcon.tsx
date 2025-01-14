import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function TaxiIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <polygon points="112 304 112 208 152 208 152 176 40 176 40 208 80 208 80 304 112 304" />
                <polygon points="333.483 304 356 269.358 378.517 304 416.683 304 375.083 240 416.683 176 378.517 176 356 210.642 333.483 176 295.317 176 336.917 240 295.317 304 333.483 304" />
                <rect width="32" height="128" x="440" y="176" />
                <rect width="432" height="32" x="40" y="104" />
                <rect width="432" height="32" x="40" y="344" />
                <path d="M241.337,280l8,24h33.731L240.4,176H194.448L155.009,304h33.484l7.4-24ZM217.72,209.146,230.671,248H205.748Z" />
            </svg>
        </IconWrapper>
    );
}
