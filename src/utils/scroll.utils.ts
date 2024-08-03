import { BODY_SCROLL_LOCK_CLASS_NAME } from 'constants/bodyScrollLockClassName';

export const lockBodyScroll = (): void => {
    const body = document.querySelector('body');

    if (!body) {
        return;
    }

    const scrollY = window.scrollY;
    body.classList.add(BODY_SCROLL_LOCK_CLASS_NAME);
    body.style.top = `-${scrollY}px`;
};

export const unlockBodyScroll = (): void => {
    const body = document.querySelector('body');

    if (!body) {
        return;
    }

    const scrollY = body.style.top;
    body.classList.remove(BODY_SCROLL_LOCK_CLASS_NAME);
    body.style.top = '';
    window.scrollTo({
        top: parseInt(scrollY || '0') * -1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        behavior: 'instant',
    });
};

export const getIsBodyScrollLocked = (): boolean => {
    const body = document.querySelector('body');

    return body?.classList.contains(BODY_SCROLL_LOCK_CLASS_NAME) || false;
};
