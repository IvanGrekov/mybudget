import { SCROLL_TOP_BUTTON_VISIBILITY_OFFSET } from 'components/scroll-top-button/constants/scrollTopButtonVisibilityOffset';

export const getIsScrollTopButtonVisible = (): boolean => {
    return window.scrollY > SCROLL_TOP_BUTTON_VISIBILITY_OFFSET;
};
