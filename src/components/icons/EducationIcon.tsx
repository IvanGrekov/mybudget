import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function EducationIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                version="1.1"
                viewBox="0 0 75 75"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <g transform="translate(12, 0)">
                    <path d="M40,1H2C1.448,1,1,1.448,1,2v60c0,0.552,0.448,1,1,1h38c0.552,0,1-0.448,1-1V2C41,1.448,40.552,1,40,1z M39,61H3V3h36V61z" />
                    <path d="M8,19h4c0.552,0,1-0.448,1-1v-4c0-0.552-0.448-1-1-1H8c-0.552,0-1,0.448-1,1v4C7,18.552,7.448,19,8,19z M9,15h2v2H9V15z" />
                    <path d="M8,27h4c0.552,0,1-0.448,1-1v-4c0-0.552-0.448-1-1-1H8c-0.552,0-1,0.448-1,1v4C7,26.552,7.448,27,8,27z M9,23h2v2H9V23z" />
                    <path d="M8,35h4c0.552,0,1-0.448,1-1v-4c0-0.552-0.448-1-1-1H8c-0.552,0-1,0.448-1,1v4C7,34.552,7.448,35,8,35z M9,31h2v2H9V31z" />
                    <path d="M8,43h4c0.552,0,1-0.448,1-1v-4c0-0.552-0.448-1-1-1H8c-0.552,0-1,0.448-1,1v4C7,42.552,7.448,43,8,43z M9,39h2v2H9V39z" />
                    <path d="M8,51h4c0.552,0,1-0.448,1-1v-4c0-0.552-0.448-1-1-1H8c-0.552,0-1,0.448-1,1v4C7,50.552,7.448,51,8,51z M9,47h2v2H9V47z" />
                    <rect height="2" width="20" x="11" y="5" />
                    <rect height="2" width="11" x="15" y="9" />
                    <rect height="2" width="18" x="17" y="15" />
                    <rect height="2" width="18" x="17" y="23" />
                    <rect height="2" width="18" x="17" y="31" />
                    <rect height="2" width="18" x="17" y="39" />
                    <rect height="2" width="18" x="17" y="47" />
                    <path d="M49.958,7.713C49.831,7.29,49.441,7,49,7s-0.831,0.29-0.958,0.713l-3,10C45.014,17.806,45,17.903,45,18v44   c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1V18c0-0.097-0.014-0.194-0.042-0.287L49.958,7.713z M49,11.48L50.656,17h-3.312   L49,11.48z M51,19v36h-4V19H51z M47,61v-4h4v4H47z" />
                    <path d="M62,43V11c0-0.127-0.024-0.253-0.071-0.372l-2-5C59.776,5.249,59.409,5,59,5s-0.776,0.249-0.929,0.628l-2,5   C56.024,10.747,56,10.873,56,11v32c-0.552,0-1,0.448-1,1v12c0,0.552,0.448,1,1,1v5c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-5   c0.552,0,1-0.448,1-1V44C63,43.448,62.552,43,62,43z M59,8.692L59.923,11h-1.846L59,8.692z M58,13h2v30h-2V13z M61,55h-4V45h4V55z    M60,61h-2v-4h2V61z" />
                </g>
            </svg>
        </IconWrapper>
    );
}
