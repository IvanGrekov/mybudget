import { useState, useEffect, useMemo, RefObject } from 'react';

import {
    TSelectProps,
    TUseSelectFieldResult,
} from 'components/select/types/select.types';
import { defaultGetOptionLabel } from 'components/select/utils/optionItem.utils';
import {
    getSelectOptionsHeight,
    getIsOptionsFixed,
    makeOptionsFixed,
    resetOptionsFixed,
} from 'components/select/utils/options.utils';
import {
    getCustomSelectBottomPosition,
    getCustomSelectWidth,
} from 'components/select/utils/select.utils';

type TUseFixedSelectOptions = (args: {
    isOpen: boolean;
    customSelectRef: RefObject<HTMLInputElement>;
    selectOptionsRef: RefObject<HTMLDivElement>;
}) => { isOptionsFixed: boolean };

export const useFixedSelectOptions: TUseFixedSelectOptions = ({
    isOpen,
    customSelectRef,
    selectOptionsRef,
}) => {
    const [isOptionsFixed, setIsOptionsFixed] = useState(false);

    useEffect(() => {
        const customSelect = customSelectRef.current;
        const selectOptions = selectOptionsRef.current;

        if (!customSelect || !selectOptions) {
            return;
        }

        const customSelectBottomPosition =
            getCustomSelectBottomPosition(customSelect);
        const selectOptionsHeight = getSelectOptionsHeight(selectOptions);
        const selectOptionsWidth = getCustomSelectWidth(customSelect);
        const isOptionsFixed = getIsOptionsFixed({
            customSelectBottomPosition,
            selectOptionsHeight,
        });

        if (isOptionsFixed) {
            setIsOptionsFixed(true);
            makeOptionsFixed({
                selectOptions,
                customSelectBottomPosition,
                selectOptionsHeight,
                selectOptionsWidth,
            });
        } else {
            setIsOptionsFixed(false);
            resetOptionsFixed(selectOptions);
        }
    }, [isOpen, customSelectRef, selectOptionsRef]);

    return { isOptionsFixed };
};

type TUseFilteredOptionsArgs<T> = Pick<
    TSelectProps<T>,
    'options' | 'getOptionLabel'
> &
    Pick<TUseSelectFieldResult<T>, 'isOpen'>;

type TUseFilteredOptionsResult<T> = {
    filteredOptions: TSelectProps<T>['options'];
    search: string;
    setSearch: (value: string) => void;
};

export const useFilteredOptions = <T>({
    isOpen,
    options,
    getOptionLabel = defaultGetOptionLabel,
}: TUseFilteredOptionsArgs<T>): TUseFilteredOptionsResult<T> => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (isOpen) {
            return;
        }

        // Need because of animation
        const timeoutId = setTimeout(() => {
            setSearch('');
        }, 200);

        return (): void => clearTimeout(timeoutId);
    }, [isOpen]);

    const filteredOptions = useMemo(() => {
        if (!search) {
            return options;
        }

        return options.filter((option) => {
            const optionLabel = getOptionLabel(option);

            return optionLabel.toLowerCase().includes(search.toLowerCase());
        });
    }, [options, search, getOptionLabel]);

    return {
        filteredOptions,
        search,
        setSearch,
    };
};
