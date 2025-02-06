'use client';

import { PropsWithChildren, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button/Button';
import Divider from 'components/divider/Divider';
import Show from 'components/show/Show';
import styles from 'components/subcategories-toggler-wrapper/SubcategoriesTogglerWrapper.module.scss';

export default function SubcategoriesTogglerWrapper({
    children,
}: PropsWithChildren): JSX.Element {
    const [areSubcategoriesVisible, setAreSubcategoriesVisible] =
        useState(false);

    const toggleSubcategoriesVisibility = (): void => {
        setAreSubcategoriesVisible((prev) => !prev);
    };

    return (
        <div>
            <div
                className={cx(styles['subcategories-toggle-button'], {
                    [styles['subcategories-toggle-button--active']]:
                        areSubcategoriesVisible,
                })}
            >
                <Button
                    text={
                        areSubcategoriesVisible
                            ? 'Hide Subcategories'
                            : 'Show Subcategories'
                    }
                    onClick={toggleSubcategoriesVisibility}
                />
            </div>

            <Show when={areSubcategoriesVisible}>
                <Divider />
                {children}
            </Show>
        </div>
    );
}
