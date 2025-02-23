import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function PictureIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <path
                    fillRule="evenodd"
                    d="M6,3 L18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 Z M6,5 C5.44771525,5 5,5.44771525 5,6 L5,18 C5,18.5522847 5.44771525,19 6,19 L18,19 C18.5522847,19 19,18.5522847 19,18 L19,6 C19,5.44771525 18.5522847,5 18,5 L6,5 Z M10.5,14.4653157 L13.5,8 L18,17 L6,17 L9,12 L10.5,14.4653157 Z M8.5,10 C7.672,10 7,9.328 7,8.5 C7,7.671 7.672,7 8.5,7 C9.328,7 10,7.671 10,8.5 C10,9.328 9.328,10 8.5,10 Z"
                />
            </svg>
        </IconWrapper>
    );
}
