import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function BitcoinIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 52 52"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <g>
                    <path d="M24,0A24,24,0,1,0,48,24,24.028,24.028,0,0,0,24,0Zm0,46A22,22,0,1,1,46,24,22.025,22.025,0,0,1,24,46Z" />
                    <path d="M25,33v2a1,1,0,0,0,2,0V33a5,5,0,0,0,3-9,5,5,0,0,0-3-9V13a1,1,0,0,0-2,0v2H22V13a1,1,0,0,0-2,0v2H19a2.916,2.916,0,0,0-3,3V30a2.916,2.916,0,0,0,3,3h1v2a1,1,0,0,0,2,0V33ZM18,18a.915.915,0,0,1,1-1h8a3,3,0,0,1,0,6H18Zm0,12V25h9a3,3,0,0,1,0,6H19.012A.919.919,0,0,1,18,30Z" />
                    <path d="M42,23a1,1,0,0,0-1,1A17.019,17.019,0,0,1,24,41a1,1,0,0,0,0,2A19.021,19.021,0,0,0,43,24,1,1,0,0,0,42,23Z" />
                    <path d="M25,6a1,1,0,0,0-1-1A19.021,19.021,0,0,0,5,24a1,1,0,0,0,2,0A17.019,17.019,0,0,1,24,7,1,1,0,0,0,25,6Z" />
                </g>
            </svg>
        </IconWrapper>
    );
}
