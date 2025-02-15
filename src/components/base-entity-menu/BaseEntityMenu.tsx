import { useRouter } from 'next/navigation';

import EditIcon from 'components/icons/EditIcon';
import EyeIcon from 'components/icons/EyeIcon';
import RemoveIcon from 'components/icons/RemoveIcon';
import Menu from 'components/menu/Menu';
import MenuActionItem from 'components/menu/MenuActionItem';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

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

    const [
        detailsItemText,
        editItemText,
        editCurrencyItemText,
        deleteItemText,
    ] = useGetFeatureTranslations({
        featureName: 'BaseEntityMenu',
        keys: ['details', 'edit', 'edit_currency', 'delete'],
    });

    return (
        <Menu className={className}>
            {(!!detailsPath || !!openDetailsModal) && (
                <MenuActionItem
                    text={detailsItemText}
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
                    text={editItemText}
                    Icon={EditIcon}
                    onClick={openEditModal}
                />
            )}

            {!!openChangeCurrencyModal && (
                <MenuActionItem
                    text={editCurrencyItemText}
                    Icon={EditIcon}
                    onClick={openChangeCurrencyModal}
                />
            )}

            {!!openDeleteModal && (
                <MenuActionItem
                    text={deleteItemText}
                    Icon={RemoveIcon}
                    onClick={openDeleteModal}
                />
            )}
        </Menu>
    );
}
