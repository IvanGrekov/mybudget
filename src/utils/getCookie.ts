export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') {
        return null;
    }

    const matches = document.cookie.match(
        new RegExp(
            `(?:^|; )${name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1')}=([^;]*)`,
        ),
    );

    return matches ? decodeURIComponent(matches[1]) : null;
};
