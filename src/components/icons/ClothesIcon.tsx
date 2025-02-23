import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function ClothesIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <g>
                    <path d="M17,2H15.59l-.29.29L12,5.59,8.71,2.29,8.41,2H7A4.39,4.39,0,0,0,2.64,5.86L1.87,12H6V22H18V12h4.13l-.77-6.14A4.4,4.4,0,0,0,17,2Zm1,8V8H16V20H8V8H6v2H4.13l.49-3.89A2.39,2.39,0,0,1,7,4h.59L12,8.41,16.41,4H17a2.4,2.4,0,0,1,2.38,2.1l.49,3.9Z" />
                </g>
            </svg>
        </IconWrapper>
    );
}
