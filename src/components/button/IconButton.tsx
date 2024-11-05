import { forwardRef, Ref } from 'react';

import Link from 'next/link';

import IconButtonBody from 'components/button/IconButtonBody';
import { IIconButtonProps } from 'components/button/types/buttonProps';

function IconButton(
    { href, ...props }: IIconButtonProps,
    ref: Ref<HTMLButtonElement>,
): JSX.Element {
    if (href) {
        return (
            <Link
                href={href}
                style={{
                    width: 'fit-content',
                    pointerEvents: props.isDisabled ? 'none' : 'auto',
                }}
            >
                <IconButtonBody {...props} ref={ref} />
            </Link>
        );
    }

    return <IconButtonBody {...props} ref={ref} />;
}

export default forwardRef(IconButton);
