import { TimeZone } from '@vvo/tzdb';

import { TIME_ZONES } from 'constants/timeZones';

const getTimeZoneNameForFieldOptions = ({
    name,
    countryName,
}: TimeZone): string => {
    const nameParts = name.split('/');

    if (nameParts.length > 2) {
        return name;
    }

    const [continentName, cityName] = nameParts;

    return `${continentName}/${countryName}/${cityName}`;
};

export const OPTIONS = TIME_ZONES.sort((a, b) => {
    const aStr = getTimeZoneNameForFieldOptions(a);
    const bStr = getTimeZoneNameForFieldOptions(b);

    return aStr.localeCompare(bStr);
}).map(({ name }) => name);
