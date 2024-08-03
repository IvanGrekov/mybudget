type TGetLimitedText = (args: { text: string; maxLength?: number }) => string;

export const getLimitedText: TGetLimitedText = ({ text, maxLength }) => {
    if (typeof maxLength === 'undefined') {
        return text;
    }

    const slicedText = text
        .slice(0, maxLength)
        .replace(/[^а-яА-Яa-zA-Z0-9]+$/, '');

    return `${slicedText}...`;
};
