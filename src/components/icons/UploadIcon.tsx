import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function UploadIcon({
    size,
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
            >
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
        </IconWrapper>
    );
}
