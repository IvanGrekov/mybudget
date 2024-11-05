import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';
import { EIconSizes } from 'components/icons/types/iconSizes';

export default function DragIcon({
    size = EIconSizes.small,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    const formattedSize =
        (typeof size === 'number' ? size : EIconSizes[size]) * 0.65;

    return (
        <IconWrapper size={formattedSize} className={wrapperClassName}>
            <svg
                fill="none"
                height="15"
                viewBox="0 0 15 15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    rotate: '90deg',
                }}
                className={className}
            >
                <path
                    d="M3 5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5C2 5.22386 2.22386 5 2.5 5C2.77614 5 3 5.22386 3 5.5Z"
                    stroke="black"
                />
                <path
                    d="M8 5.5C8 5.77614 7.77614 6 7.5 6C7.22386 6 7 5.77614 7 5.5C7 5.22386 7.22386 5 7.5 5C7.77614 5 8 5.22386 8 5.5Z"
                    stroke="black"
                />
                <path
                    d="M13 5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5C12 5.22386 12.2239 5 12.5 5C12.7761 5 13 5.22386 13 5.5Z"
                    stroke="black"
                />
                <path
                    d="M3 9.5C3 9.77614 2.77614 10 2.5 10C2.22386 10 2 9.77614 2 9.5C2 9.22386 2.22386 9 2.5 9C2.77614 9 3 9.22386 3 9.5Z"
                    stroke="black"
                />
                <path
                    d="M8 9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5C7 9.22386 7.22386 9 7.5 9C7.77614 9 8 9.22386 8 9.5Z"
                    stroke="black"
                />
                <path
                    d="M13 9.5C13 9.77614 12.7761 10 12.5 10C12.2239 10 12 9.77614 12 9.5C12 9.22386 12.2239 9 12.5 9C12.7761 9 13 9.22386 13 9.5Z"
                    stroke="black"
                />
            </svg>
        </IconWrapper>
    );
}
