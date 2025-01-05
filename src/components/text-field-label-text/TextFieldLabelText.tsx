import { PropsWithChildren } from 'react';

import styles from 'components/text-field-label-text/TextFieldLabelText.module.scss';
import Typography from 'components/typography/Typography';
import { getCapitalizedString } from 'utils/string.utils';

export interface ITextFieldLabelTextProps extends PropsWithChildren {
    text: string;
    variant?: 'body1' | 'body2' | 'caption';
}

export default function TextFieldLabelText({
    text,
    variant = 'body1',
}: ITextFieldLabelTextProps): JSX.Element {
    return (
        <Typography element="span" variant={variant} className={styles.text}>
            {getCapitalizedString(text)}
        </Typography>
    );
}
