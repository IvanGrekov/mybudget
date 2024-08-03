import { EScreenSizeNames } from 'types/screenSizeNames';

// NOTE: should be synchronized with styles/variables.scss
export const SCREEN_SIZE_NUMBERS: {
    [key in EScreenSizeNames]: number;
} = {
    [EScreenSizeNames.XS]: 479,
    [EScreenSizeNames.SM]: 767,
    [EScreenSizeNames.MD]: 1023,
    [EScreenSizeNames.LG]: 1439,
    [EScreenSizeNames.XL]: Infinity,
};
