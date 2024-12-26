import { HexColorPicker } from 'react-colorful';

import { IEntityIconColorModalProps } from 'components/entity-icon-color-modal/types/entityIconColorModalProps';

export default function EntityIconColorModalContent({
    selectedIconColor,
    changeIconColor,
}: IEntityIconColorModalProps): JSX.Element {
    return (
        <HexColorPicker
            color={selectedIconColor}
            onChange={(color) => changeIconColor(color)}
        />
    );
}
