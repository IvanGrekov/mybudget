import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function SubscriptionIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <path
                    clipRule="evenodd"
                    d="M1.5 9C1.5 8.17157 2.17157 7.5 3 7.5H21C21.8284 7.5 22.5 8.17157 22.5 9V20C22.5 20.8284 21.8284 21.5 21 21.5H3C2.17157 21.5 1.5 20.8284 1.5 20V9ZM3 8.5C2.72386 8.5 2.5 8.72386 2.5 9V20C2.5 20.2761 2.72386 20.5 3 20.5H21C21.2761 20.5 21.5 20.2761 21.5 20V9C21.5 8.72386 21.2761 8.5 21 8.5H3Z"
                />
                <path
                    clipRule="evenodd"
                    d="M9.76909 10.5565C9.93446 10.4704 10.134 10.4835 10.2867 10.5904L15.2867 14.0904C15.4204 14.1839 15.5 14.3368 15.5 14.5C15.5 14.6632 15.4204 14.8161 15.2867 14.9096L10.2867 18.4096C10.134 18.5165 9.93446 18.5296 9.76909 18.4435C9.60373 18.3574 9.5 18.1864 9.5 18V11C9.5 10.8136 9.60373 10.6426 9.76909 10.5565ZM10.5 11.9603V17.0397L14.1281 14.5L10.5 11.9603Z"
                />
                <path clipRule="evenodd" d="M20 6H4V5H20V6Z" />
                <path clipRule="evenodd" d="M18 3.5H6V2.5H18V3.5Z" />
            </svg>
        </IconWrapper>
    );
}
