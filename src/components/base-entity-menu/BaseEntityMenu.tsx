import { useRouter } from 'next/navigation';

import EditIcon from 'components/icons/EditIcon';
import EyeIcon from 'components/icons/EyeIcon';
import RemoveIcon from 'components/icons/RemoveIcon';
import Menu from 'components/menu/Menu';
import MenuActionItem from 'components/menu/MenuActionItem';

interface IBaseEntityMenuProps {
    detailsPath: string;
    setIsEditModalOpen?: (value: boolean) => void;
    setIsChangeCurrencyModalOpen?: (value: boolean) => void;
    setIsDeletingModalOpen: (value: boolean) => void;
}

export default function BaseEntityMenu({
    detailsPath,
    setIsEditModalOpen,
    setIsChangeCurrencyModalOpen,
    setIsDeletingModalOpen,
}: IBaseEntityMenuProps): JSX.Element {
    const { push } = useRouter();

    return (
        <Menu tooltipPosition="bottom-left">
            <MenuActionItem
                text="Details"
                Icon={EyeIcon}
                onClick={() => push(detailsPath)}
            />

            {!!setIsEditModalOpen && (
                <MenuActionItem
                    text="Edit"
                    Icon={EditIcon}
                    onClick={() => setIsEditModalOpen(true)}
                />
            )}

            {!!setIsChangeCurrencyModalOpen && (
                <MenuActionItem
                    text="Change Currency"
                    Icon={EditIcon}
                    onClick={() => setIsChangeCurrencyModalOpen(true)}
                />
            )}

            <MenuActionItem
                text="Delete"
                Icon={RemoveIcon}
                onClick={() => setIsDeletingModalOpen(true)}
            />
        </Menu>
    );
}
