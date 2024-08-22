import { TIME_ZONES } from 'constants/timeZones';

export const getLocalTimeZone = (): string => {
    const parsedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZone = TIME_ZONES.find(({ group }) =>
        group.includes(parsedTimeZone),
    );

    return timeZone?.name || parsedTimeZone;
};
