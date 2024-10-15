export const USER_TIME_ZONE = ((): string => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone.includes('Kiev')) {
        return 'Europe/Kyiv';
    }

    return timeZone;
})();
