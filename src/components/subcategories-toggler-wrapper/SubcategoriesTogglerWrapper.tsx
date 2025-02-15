'use client';

import { PropsWithChildren, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button/Button';
import Divider from 'components/divider/Divider';
import Show from 'components/show/Show';
import styles from 'components/subcategories-toggler-wrapper/SubcategoriesTogglerWrapper.module.scss';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

export default function SubcategoriesTogglerWrapper({
    children,
}: PropsWithChildren): JSX.Element {
    const [areSubcategoriesVisible, setAreSubcategoriesVisible] =
        useState(false);

    const toggleSubcategoriesVisibility = (): void => {
        setAreSubcategoriesVisible((prev) => !prev);
    };

    const [showSubcategoriesText, hideSubcategoriesText] =
        useGetFeatureTranslations({
            featureName: 'TransactionCategoriesPage',
            keys: ['show_subcategories', 'hide_subcategories'],
        });

    return (
        <div>
            <div
                className={cx(styles['subcategories-toggler'], {
                    [styles['subcategories-toggler--active']]:
                        areSubcategoriesVisible,
                })}
            >
                <Button
                    text={
                        areSubcategoriesVisible
                            ? hideSubcategoriesText
                            : showSubcategoriesText
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
