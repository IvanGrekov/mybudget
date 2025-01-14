import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function EditIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                className={className}
                style={{ fill: color ? color : undefined }}
                width="64"
                height="64"
                viewBox="0 0 64 64"
            >
                <g>
                    <path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z" />
                    <polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  " />
                    <polygon points="20.273,37.028 18.642,46.28 27.913,44.654  " />
                    <path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z" />
                </g>
            </svg>
        </IconWrapper>
    );
}
