'use client';

import { ISpacingProps } from 'components/spacing/types/spacingProps';
import { getSpacingSize } from 'components/spacing/utils/getSpacingSize';
import { useWindowSize } from 'hooks/useWindowSize';

export default function Spacing({
    xs,
    sm = xs,
    md = sm || xs,
    lg = md || sm || xs,
    xl = lg || md || sm || xs,
}: ISpacingProps): JSX.Element | null {
    const windowSize = useWindowSize();

    if (!windowSize) {
        return null;
    }

    const spacingSize = getSpacingSize({
        windowSize,
        xs,
        sm,
        md,
        lg,
        xl,
    });

    return <div style={{ height: spacingSize }} />;
}
