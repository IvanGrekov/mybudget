import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cx from 'classnames';

import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import DragIcon from 'components/icons/DragIcon';
import styles from 'features/accounts-reordering/components/account-card/AccountCard.module.scss';
import { Account } from 'types/generated.types';

interface IAccountCardProps {
    account: Account;
    isLoading: boolean;
}

export default function AccountCard({
    account,
    isLoading,
}: IAccountCardProps): JSX.Element {
    const { name, id } = account;

    const { attributes, listeners, transform, transition, setNodeRef } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(isLoading ? {} : listeners)}
        >
            <Card
                className={cx(styles.card, {
                    [styles['card--loading']]: isLoading,
                })}
            >
                <CardHeader
                    title={<CardTitle title={name} />}
                    actions={<DragIcon />}
                    shouldHideBorder={true}
                />
            </Card>
        </li>
    );
}
