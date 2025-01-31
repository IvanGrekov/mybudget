import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';
import { EIconSizes } from 'components/icons/types/iconSizes';

export default function FridgeIcon({
    size = EIconSizes.small,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    const formattedSize = typeof size === 'number' ? size * 1.1 : size;

    return (
        <IconWrapper size={formattedSize} className={wrapperClassName}>
            <svg
                data-name="Layer 1"
                id="Layer_1"
                viewBox="0 0 34 34"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <title />
                <path d="M22.5,3H9.5A1.5,1.5,0,0,0,8,4.5V29H24V4.5A1.5,1.5,0,0,0,22.5,3ZM9.5,4h13a0.5,0.5,0,0,1,.5.5V19H9V4.5A0.5,0.5,0,0,1,9.5,4ZM9,28V20H23v8H9Z" />
                <rect height="3" width="1" x="10" y="21" />
                <rect height="3" width="1" x="10" y="15" />
            </svg>
        </IconWrapper>
    );
}
