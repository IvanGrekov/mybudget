import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function HandShakingIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 630 630"
                xmlSpace="preserve"
                className={className}
                style={{ fill: color ? color : undefined }}
            >
                <g>
                    <path
                        d="M601.153,194.508L465.05,58.404c-13.174-13.174-35.583-13.174-48.685,0l-66.512,66.512l-47.969,47.969l-37.874-37.874
		c0,0,0,0-0.788-0.788c0,0,0,0-0.788-0.788l-67.3-67.3c-13.89-13.89-37.087-13.89-51.048,0L10.417,202.24
		c-13.89,13.89-13.89,37.087,0,51.048l67.3,67.3c0,0,0,0,0.788,0.788c0,0,0,0,0.788,0.788l62.646,62.646l-2.291,2.291
		c-1.575,1.575-2.291,3.079-3.079,4.654c-6.157,6.157-10.023,14.677-10.023,23.985s3.866,17.756,10.023,23.985l110.544,110.544
		c6.157,6.157,15.465,10.023,23.985,10.023c9.307,0,17.756-3.866,23.985-10.023l6.157-6.157l10.811,10.811l0.788,0.788
		c3.866,3.866,11.599,7.732,20.906,7.732c6.157,0,14.677-1.575,23.985-10.811L467.413,442.73
		c18.543-18.543,13.174-37.874,2.291-50.26l-8.52-8.52l74.245-74.173l66.512-66.512c6.157-6.157,10.023-15.465,10.023-24.772
		C611.177,209.972,607.311,200.736,601.153,194.508z M30.536,222.358L165.851,87.043c1.575-1.575,3.079-2.291,5.441-2.291
		c2.363,0,3.866,0.788,5.441,2.291l57.205,57.205L87.025,289.587L29.82,232.382C27.385,230.091,27.385,225.437,30.536,222.358z
		 M270.238,531.652c-0.788,0-2.291,0-3.866-1.575L155.756,419.533c-1.575-1.575-1.575-3.079-1.575-3.866
		c0-0.788,0-2.291,1.575-3.866l3.866-3.866l0,0l7.732-7.732l17.756-17.756l0.788-0.788c0.788-0.788,2.291-0.788,3.079-0.788
		s2.291,0,3.866,1.575L303.458,492.99c2.291,2.291,2.291,6.157,0,7.732l-13.174,13.174l-16.181,16.252
		C272.529,531.652,270.954,531.652,270.238,531.652z M446.507,421.896L336.679,532.439c-2.291,2.291-3.079,2.291-3.866,2.291
		c0,0-0.788,0-1.575-0.788l-10.023-10.023l2.291-2.291l0,0c0.788-0.788,1.575-1.575,2.291-3.079
		c0.788-0.788,1.575-1.575,2.291-2.291c0.788-0.788,0.788-1.575,0.788-2.291c0.788-1.575,1.575-2.291,2.291-3.866l0,0
		c4.654-12.386,2.291-27.063-7.732-37.087L212.961,361.54c-1.575-1.575-3.079-3.079-5.441-4.654
		c-0.788-0.788-1.575-0.788-2.291-0.788c-1.575-0.788-2.291-1.575-3.866-2.291c-0.788,0-1.575-0.788-2.291-0.788
		c-1.575-0.788-2.291-0.788-3.866-0.788c-0.788,0-1.575,0-2.291,0c-1.575,0-3.079-0.788-4.654-0.788s-2.291,0-3.866,0
		c-0.788,0-2.291,0-3.079,0c-2.291,0-3.866,0.788-5.441,1.575h-0.788c-3.866,1.575-7.732,3.866-11.599,6.945l-2.291,2.291
		l-53.339-53.339l146.127-143.836l27.851,27.851l-77.323,77.323c-10.023,10.023-14.677,27.851,0,42.528l30.142,30.142
		c1.575,1.575,3.079,2.291,4.654,3.079c4.654,3.079,10.023,4.654,15.465,4.654c1.575,0,3.079,0,5.441-0.788c0,0,0,0,0.788,0
		c1.575,0,3.079-0.788,4.654-1.575h0.788c1.575-0.788,3.079-1.575,4.654-2.291c0,0,0.788,0,0.788-0.788
		c1.575-0.788,3.079-2.291,4.654-3.866l50.26-50.26l119.064,119.064l1.575,1.575C450.373,414.163,451.948,416.454,446.507,421.896z
		 M440.349,363.903l-92.788-92.788l13.174-13.174c3.079-3.079,3.866-6.157,3.866-10.023s-1.575-6.945-3.866-10.023
		c-5.441-5.441-14.677-5.441-20.118,0l-23.197,23.197l-60.284,60.284c-0.788,0.788-1.575,0.788-1.575,1.575l0,0l-30.142-30.142
		c-0.788-0.788-0.788-0.788-0.788-1.575c0-0.788,0.788-0.788,0.788-1.575l135.316-135.316l80.402,80.402l64.15,64.15
		L440.349,363.903z M581.035,223.146l-56.417,56.417L407.845,162.791l-27.851-27.851l56.417-56.417
		c1.575-1.575,3.079-1.575,4.654-1.575c0.788,0,3.079,0,4.654,1.575l136.103,136.103c1.575,1.575,1.575,3.079,1.575,4.654
		C582.61,220.067,582.61,221.571,581.035,223.146z"
                    />
                </g>
            </svg>
        </IconWrapper>
    );
}
