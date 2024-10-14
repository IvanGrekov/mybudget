import { forwardRef, Ref } from 'react';

import Link from 'next/link';

import ButtonBody from 'components/button//ButtonBody';
import { IButtonProps } from 'components/button/types/buttonProps';

const Button = (
    { href, ...props }: IButtonProps,
    ref: Ref<HTMLButtonElement>,
): JSX.Element => {
    if (href) {
        return (
            <Link href={href}>
                <ButtonBody {...props} ref={ref} />
            </Link>
        );
    }

    return <ButtonBody {...props} ref={ref} />;
};

export default forwardRef(Button);
