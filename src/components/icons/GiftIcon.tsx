import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function GiftIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <path d="M216,72H181.03271a31.99968,31.99968,0,0,0-47.37646-42.91162A30.99155,30.99155,0,0,0,128,37.2998a31.01227,31.01227,0,0,0-5.65723-8.21191A31.99948,31.99948,0,0,0,74.96729,72H40A16.01817,16.01817,0,0,0,24,88v32a16.01817,16.01817,0,0,0,16,16v64a16.01833,16.01833,0,0,0,16,16H200a16.01833,16.01833,0,0,0,16-16V136a16.01817,16.01817,0,0,0,16-16V88A16.01817,16.01817,0,0,0,216,72ZM144.96973,40.4021a16.00019,16.00019,0,1,1,22.62793,22.62744c-4.94043,4.94116-19.22559,7.71582-31.25684,8.6294C137.25488,59.62671,140.0293,45.34277,144.96973,40.4021Zm-56.56836,0a16.0194,16.0194,0,0,1,22.62793-.00024c4.9414,4.94116,7.71582,19.22631,8.62988,31.25683-12.03223-.91382-26.31641-3.68848-31.25684-8.62915A16.01925,16.01925,0,0,1,88.40137,40.4021ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80l.00977,31.99951Z" />
            </svg>
        </IconWrapper>
    );
}
