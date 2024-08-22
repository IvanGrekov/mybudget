import { TIME_ZONES } from 'constants/timeZones';
import { convertMinutesToHours } from 'utils/dateConverters';

const getTimeZoneOffset = (timeZone: string): number => {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const timeZoneDate = new Date(date.toLocaleString('en-US', { timeZone }));

    // 3_600_000 - 1hr in ms (IG)
    return (timeZoneDate.getTime() - utcDate.getTime()) / 3_600_000;
};

const getContinentName = (timeZoneName: string): string => {
    const [continent] = timeZoneName.split('/');

    return continent;
};

const getCityName = (timeZoneName: string): string => {
    const parts = timeZoneName.split('/');
    let cityName = parts[1];

    if (parts.length > 2) {
        cityName = parts[2];
    }

    return cityName.replaceAll('_', ' ');
};

const getHoursSign = (hours: number): string => {
    return hours >= 0 ? '+' : '';
};

export const getTimeZoneFieldLabel = (timeZoneName: string): string => {
    const timeZone = TIME_ZONES.find(({ name }) => name === timeZoneName);

    const cityName = getCityName(timeZoneName);
    const continentName = getContinentName(timeZoneName);

    let offset = getTimeZoneOffset(timeZoneName);
    let resultName = `${continentName} - ${getCityName(timeZoneName)}`;
    let abbreviationText = '';

    if (timeZone) {
        const { countryName, currentTimeOffsetInMinutes, abbreviation } =
            timeZone;
        const locationName =
            cityName === countryName
                ? cityName
                : `${countryName} - ${cityName}`;

        offset = convertMinutesToHours(currentTimeOffsetInMinutes);
        resultName =
            continentName === countryName
                ? `${continentName}, ${cityName}`
                : `${continentName}, ${locationName}`;
        abbreviationText = ` (${abbreviation})`;
    }

    const hours = Math.floor(offset);
    const minutes = Math.floor((offset - hours) * 60);
    const sign = getHoursSign(hours);
    let offsetString = `${sign}${hours}`;
    if (minutes) {
        offsetString += `:${minutes}`;
    }

    return `${resultName}, ${offsetString} HRS${abbreviationText}`;
};
