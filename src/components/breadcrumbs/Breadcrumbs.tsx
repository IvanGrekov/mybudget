import { Fragment } from 'react';

import styles from 'components/breadcrumbs/Breadcrumbs.module.scss';
import BreadcrumbsItem from 'components/breadcrumbs/BreadcrumbsItem';
import { IBreadcrumbsItem } from 'components/breadcrumbs/types/breadcrumbsItem';
import Show from 'components/show/Show';

interface IBreadcrumbsProps {
    items: IBreadcrumbsItem[];
}

export default function Breadcrumbs({ items }: IBreadcrumbsProps): JSX.Element {
    return (
        <div className={styles.container}>
            {items.map((item, i) => {
                const isFirst = i === 0;

                return (
                    <Fragment key={item.label}>
                        <Show when={!isFirst}>
                            <div className={styles.dot} />
                        </Show>

                        <BreadcrumbsItem {...item} />
                    </Fragment>
                );
            })}
        </div>
    );
}
