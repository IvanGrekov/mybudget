import {
    cloneElement,
    MouseEventHandler,
    FunctionComponentElement,
} from 'react';

type TGetElementWithOnClick = (args: {
    Element: JSX.Element;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) => FunctionComponentElement<unknown>;

export const getElementWithOnClick: TGetElementWithOnClick = ({
    Element,
    onClick,
}) => {
    return cloneElement(Element, {
        onClick,
    });
};
