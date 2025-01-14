import { useRouter } from 'next/navigation';

import EditIcon from 'components/icons/EditIcon';
import EyeIcon from 'components/icons/EyeIcon';
import RemoveIcon from 'components/icons/RemoveIcon';
import Menu from 'components/menu/Menu';
import MenuActionItem from 'components/menu/MenuActionItem';

interface IBaseEntityMenuProps {
    detailsPath?: string;
    className?: string;
    openDetailsModal?: VoidFunction;
    openEditModal?: VoidFunction;
    openChangeCurrencyModal?: VoidFunction;
    openDeleteModal?: VoidFunction;
}

export default function BaseEntityMenu({
    detailsPath,
    className,
    openDetailsModal,
    openEditModal,
    openChangeCurrencyModal,
    openDeleteModal,
}: IBaseEntityMenuProps): JSX.Element {
    const { push } = useRouter();

    return (
        <Menu tooltipPosition="bottom-left" className={className}>
            {(!!detailsPath || !!openDetailsModal) && (
                <MenuActionItem
                    text="Details"
                    Icon={EyeIcon}
                    onClick={
                        detailsPath
                            ? (): void => push(detailsPath)
                            : openDetailsModal
                    }
                />
            )}

            {!!openEditModal && (
                <MenuActionItem
                    text="Edit"
                    Icon={EditIcon}
                    onClick={openEditModal}
                />
            )}

            {!!openChangeCurrencyModal && (
                <MenuActionItem
                    text="Edit Currency"
                    Icon={EditIcon}
                    onClick={openChangeCurrencyModal}
                />
            )}

            {!!openDeleteModal && (
                <MenuActionItem
                    text="Delete"
                    Icon={RemoveIcon}
                    onClick={openDeleteModal}
                />
            )}
        </Menu>
    );
}
