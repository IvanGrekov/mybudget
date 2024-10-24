import { TTypographyChildren } from 'types/typographyChildren';

type TGetLimitedText = (args: {
    children: TTypographyChildren;
    maxLength?: number;
}) => TTypographyChildren;

export const getLimitedText: TGetLimitedText = ({ children, maxLength }) => {
    if (!children) {
        return '';
    }

    if (typeof children === 'function' || typeof children === 'object') {
        return children;
    }

    if (typeof maxLength === 'undefined') {
        return children;
    }

    const string = Array.isArray(children)
        ? children.join('')
        : children.toString();

    const slicedText = string
        .slice(0, maxLength)
        .replace(/[^а-яА-Яa-zA-Z0-9]+$/, '');

    return `${slicedText}...`;
};
