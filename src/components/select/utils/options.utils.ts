import { getWindowHeight } from 'utils/windowSize.utils';

export const getSelectOptionsHeight = (
    selectOptions: HTMLDivElement,
): number => {
    return selectOptions.clientHeight;
};

type TGetIsOptionsFixed = (args: {
    customSelectBottomPosition: number;
    selectOptionsHeight: number;
}) => boolean;

export const getIsOptionsFixed: TGetIsOptionsFixed = ({
    customSelectBottomPosition,
    selectOptionsHeight,
}): boolean => {
    const windowHeight = getWindowHeight();

    return customSelectBottomPosition + selectOptionsHeight > windowHeight;
};

type TMakeOptionsFixed = (args: {
    selectOptions: HTMLDivElement;
    customSelectBottomPosition: number;
    selectOptionsHeight: number;
    selectOptionsWidth: number;
}) => void;

const BORDER_WIDTH_GUTTER = 2;

export const makeOptionsFixed: TMakeOptionsFixed = ({
    selectOptions,
    customSelectBottomPosition,
    selectOptionsHeight,
    selectOptionsWidth,
}) => {
    selectOptions.style.position = 'fixed';
    selectOptions.style.top = `${
        customSelectBottomPosition - selectOptionsHeight - BORDER_WIDTH_GUTTER
    }px`;
    selectOptions.style.width = `${selectOptionsWidth + BORDER_WIDTH_GUTTER}px`;
};

export const resetOptionsFixed = (selectOptions: HTMLDivElement): void => {
    selectOptions.style.position = '';
    selectOptions.style.top = '';
    selectOptions.style.width = '';
};
