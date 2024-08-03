import cx from 'classnames';

import SearchField from 'components/search-field/SearchField';
import OptionItem from 'components/select/OptionItem';
import styles from 'components/select/Select.module.scss';
import { useFilteredOptions } from 'components/select/hooks/options.hooks';
import {
    TSelectProps,
    TUseSelectFieldResult,
} from 'components/select/types/select.types';
import { defaultGetOptionLabel } from 'components/select/utils/optionItem.utils';

type TOptionsProps<T> = Pick<
    TSelectProps<T>,
    | 'value'
    | 'onChange'
    | 'options'
    | 'error'
    | 'multiple'
    | 'shouldAddSearch'
    | 'getOptionLabel'
    | 'getOptionValue'
    | 'getIsOptionDisabled'
    | 'getIsOptionHidden'
    | 'getIsOptionSelected'
> &
    Pick<
        TUseSelectFieldResult<T>,
        'selectOptionsRef' | 'isOpen' | 'isOptionsFixed'
    >;

export default function Options<T>({
    options,
    error,
    selectOptionsRef,
    isOpen,
    isOptionsFixed,
    shouldAddSearch,
    getOptionLabel = defaultGetOptionLabel,
    ...props
}: TOptionsProps<T>): JSX.Element {
    const { filteredOptions, search, setSearch } = useFilteredOptions<T>({
        isOpen,
        options,
        getOptionLabel,
    });

    return (
        <div
            ref={selectOptionsRef}
            className={cx(styles.options, {
                [styles['options--open']]: isOpen,
                [styles['options--fixed']]: isOptionsFixed,
                [styles['options--error']]: error,
            })}
        >
            {shouldAddSearch && (
                <SearchField
                    value={search}
                    placeholderVariant="body2"
                    className={styles['search-field']}
                    containerClassName={styles['search-field__container']}
                    textFieldWrapperClassName={
                        styles['search-field__text-field-wrapper']
                    }
                    iconSize={15}
                    onChange={(e): void => setSearch(e.target.value)}
                    onClick={(e): void => e.stopPropagation()}
                />
            )}

            {filteredOptions.map((option) => (
                <OptionItem
                    key={getOptionLabel(option)}
                    option={option}
                    getOptionLabel={getOptionLabel}
                    {...props}
                />
            ))}
        </div>
    );
}
