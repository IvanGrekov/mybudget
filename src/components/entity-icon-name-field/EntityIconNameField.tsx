import { FC } from 'react';

import Button from 'components/button/Button';
import EntityIconNameModal from 'components/entity-icon-name-modal/EntityIconNameModal';
import { IEntityIconNameModalProps } from 'components/entity-icon-name-modal/types/entityIconNameModalProps';
import { IIconProps } from 'components/icons/types/iconProps';
import { useGetEntityIconFormFeatureTranslations } from 'hooks/translations.hooks';
import { useModal } from 'hooks/useModal';

interface IEntityIconNameFieldProps {
    Icon: FC<IIconProps>;
    iconColor: string;
}

export default function EntityIconNameField({
    Icon,
    iconColor,
    ...rest
}: IEntityIconNameFieldProps & IEntityIconNameModalProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    const label = useGetEntityIconFormFeatureTranslations()('icon_name');

    return (
        <>
            <Button
                Icon={Icon}
                text={label}
                iconColor={iconColor}
                size="regular"
                onClick={openModal}
            />

            <EntityIconNameModal
                isOpen={isModalOpen}
                {...rest}
                onClose={closeModal}
            />
        </>
    );
}
