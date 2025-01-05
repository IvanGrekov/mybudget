import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function EmptyIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="512"
                height="512"
                viewBox="0 0 512 512"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <g>
                    <path
                        d="M512,288v192H0V288L128,32h256L512,288z M476.219,288l-112-224H147.781l-112,224H128c0,70.688,57.313,128,128,128
		c70.688,0,128-57.312,128-128H476.219z"
                    />
                </g>
            </svg>
        </IconWrapper>
    );
}
