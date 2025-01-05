import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function DonateIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                style={{ fill: color ? color : undefined }}
                version="1.1"
                viewBox="0 0 32 32"
            >
                <g>
                    <g>
                        <g>
                            <path
                                fill="none"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                d="M24,17.8l3.5-3.5c0.5-0.5,0.5-1.3,0-1.8l0,0c-0.5-0.5-1.3-0.5-1.8,0l-6.9,6.9l0,0c-0.7,0.7-1.1,1.6-1.1,2.6     v4.8c0,0.5,0.4,0.9,0.9,0.9h6.3c0.5,0,0.9-0.4,0.9-0.9v-5.1c0-1,0.4-1.9,1.1-2.6L30,16c0.7-0.7,1.1-1.7,1.1-2.7l-0.2-6.2     c0-0.7-0.6-1.3-1.4-1.3l0,0c-0.8,0-1.4,0.7-1.4,1.4l-0.2,6"
                            />
                            <line
                                fill="none"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                x1="17.7"
                                y1="24.3"
                                x2="25.7"
                                y2="24.3"
                            />
                        </g>
                        <g>
                            <path
                                fill="none"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                d="M8,17.8l-3.5-3.5C4,13.8,4,13,4.5,12.5l0,0C5,12,5.8,12,6.3,12.5l6.9,6.9l0,0c0.7,0.7,1.1,1.6,1.1,2.6v4.8     c0,0.5-0.4,0.9-0.9,0.9H7.1c-0.5,0-0.9-0.4-0.9-0.9v-5.1c0-1-0.4-1.9-1.1-2.6l-3-3.1C1.3,15.2,1,14.3,1,13.3l0.2-6.2     c0-0.7,0.6-1.3,1.4-1.3l0,0C3.4,5.8,4,6.5,4,7.2l0.2,6"
                            />
                            <line
                                fill="none"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                x1="14.3"
                                y1="24.3"
                                x2="6.3"
                                y2="24.3"
                            />
                        </g>
                    </g>
                    <g>
                        <circle
                            fill="none"
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            cx="16"
                            cy="10.5"
                            r="6.2"
                        />
                        <g>
                            <g>
                                <path
                                    fill="none"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    d="M17.7,8.3h-1.3h-0.9c-0.6,0-1.1,0.5-1.1,1.1l0,0c0,0.6,0.5,1.1,1.1,1.1h1.1"
                                />
                                <path
                                    fill="none"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    d="M16.5,10.5c0.6,0,1.1,0.5,1.1,1.1l0,0c0,0.6-0.5,1.1-1.1,1.1h-2.2"
                                />
                            </g>
                            <line
                                fill="none"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                x1="16.3"
                                y1="7"
                                x2="16.3"
                                y2="8.3"
                            />
                            <line
                                fill="none"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                x1="16.3"
                                y1="12.8"
                                x2="16.3"
                                y2="14.1"
                            />
                        </g>
                    </g>
                </g>
            </svg> */}

            <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <path d="M17.726 13.02 14 16H9v-1h4.065a.5.5 0 0 0 .416-.777l-.888-1.332A1.995 1.995 0 0 0 10.93 12H3a1 1 0 0 0-1 1v6a2 2 0 0 0 2 2h9.639a3 3 0 0 0 2.258-1.024L22 13l-1.452-.484a2.998 2.998 0 0 0-2.822.504zm1.532-5.63c.451-.465.73-1.108.73-1.818s-.279-1.353-.73-1.818A2.447 2.447 0 0 0 17.494 3S16.25 2.997 15 4.286C13.75 2.997 12.506 3 12.506 3a2.45 2.45 0 0 0-1.764.753c-.451.466-.73 1.108-.73 1.818s.279 1.354.73 1.818L15 12l4.258-4.61z" />
            </svg>
        </IconWrapper>
    );
}
