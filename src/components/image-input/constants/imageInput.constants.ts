export const AVAILABLE_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

export const INPUT_DEFAULT_CAPTION = `Allowed ${AVAILABLE_IMAGE_FORMATS.map(
    (format) => `*.${format}`,
).join(', ')}`;

export const INPUT_ACCEPT_ATTRIBUTE = AVAILABLE_IMAGE_FORMATS.map(
    (format) => `image/${format}`,
).join(',');

// NOTE: Should be synchronized with `styles/variables.scss` ($input-width)
export const IMAGE_INPUT_SIZE = 300;
