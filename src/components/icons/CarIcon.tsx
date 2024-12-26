import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';
import { EIconSizes } from 'components/icons/types/iconSizes';

export default function CarIcon({
    size = EIconSizes.small,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    const formattedSize = typeof size === 'number' ? size * 1.1 : size;

    return (
        <IconWrapper size={formattedSize} className={wrapperClassName}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 34.952 34.952"
                xmlSpace="preserve"
                className={className}
                style={{ fill: color }}
            >
                <g>
                    <g>
                        <path
                            d="M24.333,23.109H12.902c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h11.431c0.276,0,0.5,0.224,0.5,0.5
			S24.609,23.109,24.333,23.109z"
                        />
                        <path
                            d="M10.183,25.829c-1.776,0-3.221-1.444-3.221-3.221s1.444-3.221,3.221-3.221c1.775,0,3.22,1.444,3.22,3.221
			S11.958,25.829,10.183,25.829z M10.183,20.388c-1.225,0-2.221,0.996-2.221,2.221s0.996,2.221,2.221,2.221
			c1.224,0,2.22-0.996,2.22-2.221S11.406,20.388,10.183,20.388z"
                        />
                        <path
                            d="M27.054,25.829c-1.776,0-3.221-1.444-3.221-3.221s1.444-3.221,3.221-3.221s3.221,1.444,3.221,3.221
			S28.83,25.829,27.054,25.829z M27.054,20.388c-1.225,0-2.221,0.996-2.221,2.221s0.996,2.221,2.221,2.221s2.221-0.996,2.221-2.221
			S28.278,20.388,27.054,20.388z"
                        />
                    </g>
                    <path
                        d="M24.337,23.109H12.904c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h11.433c0.276,0,0.5,0.224,0.5,0.5
		S24.613,23.109,24.337,23.109z"
                    />
                    <path
                        d="M32.175,23.109h-2.403c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2.403c0.619,0,1.138-0.444,1.233-1.056l0.533-3.413
		c0.037-0.239-0.022-0.477-0.169-0.67c-0.146-0.192-0.357-0.314-0.598-0.344l-6.661-0.812c-0.096-0.012-0.187-0.051-0.261-0.113
		l-6.021-5.061c-0.397-0.334-0.902-0.518-1.422-0.518H9.39c-0.465,0-0.892,0.234-1.143,0.626l-2.815,4.405
		c-0.063,0.101-0.162,0.175-0.276,0.209l-3.4,1.025c-0.505,0.152-0.823,0.659-0.742,1.181l0.476,3.049
		c0.135,0.863,0.867,1.49,1.741,1.49h4.229c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5H3.229c-1.37,0-2.519-0.982-2.729-2.336
		l-0.476-3.049c-0.157-1.012,0.462-1.997,1.441-2.292l3.224-0.972l2.716-4.25C7.84,9.529,8.582,9.123,9.39,9.123h9.421
		c0.754,0,1.487,0.267,2.064,0.752l5.907,4.965l6.514,0.794c0.512,0.063,0.964,0.322,1.274,0.733
		c0.311,0.41,0.438,0.917,0.359,1.427l-0.533,3.413C34.225,22.309,33.29,23.109,32.175,23.109z"
                    />
                    <path
                        d="M21.16,16.204H9.692c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H21.16c0.276,0,0.5,0.224,0.5,0.5
		S21.436,16.204,21.16,16.204z"
                    />
                </g>
            </svg>
        </IconWrapper>
    );
}
