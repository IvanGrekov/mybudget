import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';
import { EIconSizes } from 'components/icons/types/iconSizes';

export default function UaFlagIcon({
    size = EIconSizes.extraSmall,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                className={className}
                style={{ fill: color }}
            >
                <defs>
                    <clipPath id="clip-path">
                        <circle cx="20" cy="20" r="20" fill="none" />
                    </clipPath>
                </defs>
                <g>
                    <g>
                        <g clipPath="url(#clip-path)">
                            <path
                                fill="#fdce24"
                                d="M60,19.94c0,6,0,12.08,0,18.12a3.25,3.25,0,0,1-3.22,3c-.2,0-.42,0-.62,0H-16.16a3.66,3.66,0,0,1-3.28-1.45,2.76,2.76,0,0,1-.57-1.6q0-9.06,0-18.12a1.11,1.11,0,0,1,.8-.25c.27,0,.53,0,.79,0H58.4C58.94,19.69,59.51,19.55,60,19.94Z"
                            />
                            <path
                                fill="#347fc0"
                                d="M60,19.94H-20c0-6,0-12.07,0-18.11A3,3,0,0,1-16.93-1.1q36.93,0,73.86,0A3.05,3.05,0,0,1,60,1.83C60,7.87,60,13.9,60,19.94Z"
                            />
                        </g>
                    </g>
                </g>
            </svg>
        </IconWrapper>
    );
}
