import { forwardRef } from 'react';

import Button from 'components/button/Button';
import { IButtonProps } from 'components/button/types/buttonProps';

const SubmitButton = ({
    variant = 'contained',
    ...props
}: IButtonProps): JSX.Element => {
    return <Button {...props} type="submit" variant={variant} />;
};

export default forwardRef(SubmitButton);
