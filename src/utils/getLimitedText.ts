import { TTypographyChildren } from 'types/typographyChildren';

type TGetLimitedText = (args: {
    text: TTypographyChildren;
    maxLength?: number;
}) => TTypographyChildren;

export const getLimitedText: TGetLimitedText = ({ text, maxLength }) => {
    if (typeof maxLength === 'undefined') {
        return text;
    }

    const string = Array.isArray(text) ? text.join('') : text.toString();

    const slicedText = string
        .slice(0, maxLength)
        .replace(/[^а-яА-Яa-zA-Z0-9]+$/, '');

    return `${slicedText}...`;
};
