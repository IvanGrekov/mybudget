import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function ErrorIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <path d="M15.040 12.512l-6.096-10.208c-0.432-0.72-1.472-0.784-1.92-0.080l-6.047 10.272c-0.48 0.752 0.064 1.905 0.959 1.905h12.128c0.88 0 1.424-1.136 0.976-1.888zM7.968 12.672c-0.432 0-0.784-0.351-0.784-0.784s0.351-0.784 0.784-0.784c0.432 0 0.784 0.351 0.784 0.784s-0.351 0.784-0.784 0.784zM8.8 9.792c0 0.432-0.368 0.784-0.8 0.784s-0.8-0.351-0.8-0.784v-4.097c0-0.432 0.368-0.784 0.8-0.784s0.8 0.351 0.8 0.784v4.097z" />
            </svg>
        </IconWrapper>
    );
}
