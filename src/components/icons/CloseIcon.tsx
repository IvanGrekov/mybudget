import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';
import { EIconSizes } from 'components/icons/types/iconSizes';

export default function CloseIcon({
    size = EIconSizes.small,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    const formattedSize =
        (typeof size === 'number' ? size : EIconSizes[size]) * 0.75;

    return (
        <IconWrapper size={formattedSize} wrapperClassName={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 212.982 212.982"
                width={212.982}
                height={212.982}
                className={className}
            >
                <g>
                    <path
                        d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
		c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
		l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
		c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                    />
                </g>
            </svg>
        </IconWrapper>
    );
}
