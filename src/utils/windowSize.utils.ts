export const getWindowWidth = (): number => {
    if (typeof window === 'undefined') {
        return 0;
    }

    return window.innerWidth;
};

export const getWindowHeight = (): number => {
    if (typeof window === 'undefined') {
        return 0;
    }

    return window.innerHeight;
};
