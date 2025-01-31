import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function BurgerIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 82 82"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <g>
                    <path
                        d="M38,0C17,0,0,17,0,38s17,38,38,38s38-17,38-38S59,0,38,0z M38,72C19.2,72,4,56.8,4,38S19.2,4,38,4s34,15.2,34,34
		S56.8,72,38,72z M57.5,38c0,1.1-0.9,2-2,2h-35c-1.1,0-2-0.9-2-2s0.9-2,2-2h35C56.6,36,57.5,36.9,57.5,38z M57.5,50c0,1.1-0.9,2-2,2
		h-35c-1.1,0-2-0.9-2-2s0.9-2,2-2h35C56.6,48,57.5,48.9,57.5,50z M57.5,26c0,1.1-0.9,2-2,2h-35c-1.1,0-2-0.9-2-2s0.9-2,2-2h35
		C56.6,24,57.5,24.9,57.5,26z"
                    />
                </g>
            </svg>
        </IconWrapper>
    );
}
