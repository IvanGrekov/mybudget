import Chip from 'components/chip/Chip';
import styles from 'components/select/Select.module.scss';
import { TSelectProps } from 'components/select/types/select.types';
import {
    defaultGetOptionLabel,
    getOnDeleteOptionByLabel,
} from 'components/select/utils/optionItem.utils';
import Typography from 'components/typography/Typography';

type TSelectValuePreview<T> = Pick<
    TSelectProps<T>,
    'options' | 'value' | 'getOptionLabel' | 'onChange'
>;

export default function SelectValuePreview<T>({
    options,
    value,
    getOptionLabel = defaultGetOptionLabel,
    onChange,
}: TSelectValuePreview<T>): JSX.Element | null {
    const isMultipleValue = Array.isArray(value);
    const isEmptyValue = isMultipleValue ? value.length === 0 : !value;

    if (isEmptyValue) {
        return null;
    }

    if (isMultipleValue) {
        const valueLabels = value.map(getOptionLabel);

        return (
            <>
                {valueLabels.map((label) => {
                    const onDelete = getOnDeleteOptionByLabel({
                        label,
                        options,
                        getOptionLabel,
                        onChange,
                    });

                    return (
                        <Chip
                            key={label}
                            title={label}
                            size="small"
                            titleVariant="body2"
                            buttonTabIndex={-1}
                            className={styles['chip']}
                            onDelete={onDelete}
                        />
                    );
                })}
            </>
        );
    }

    return (
        <Typography className={styles['value-preview']}>
            {getOptionLabel(value)}
        </Typography>
    );
}
