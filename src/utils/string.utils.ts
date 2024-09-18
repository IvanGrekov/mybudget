type TGetCapitalizedString = (string: string, separator?: string) => string;

export const getCapitalizedString: TGetCapitalizedString = (
    string,
    separator = ' ',
) => {
    const stringParts = string.split(separator);
    const capitalizedParts = stringParts.map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });

    return capitalizedParts.join(' ');
};
