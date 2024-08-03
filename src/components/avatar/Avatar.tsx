import { forwardRef, Ref } from 'react';

import cx from 'classnames';
import Image from 'next/image';

import styles from 'components/avatar/Avatar.module.scss';
import { IAvatarProps } from 'components/avatar/types/avatarProps';
import { EAvatarSizes } from 'components/avatar/types/avatarSizes';
import { getTypographyVariant } from 'components/avatar/utils/getTypographyVariant';
import Typography from 'components/typography/Typography';
import { getInitials } from 'utils/getInitials';

function Avatar(
    { name, image, size = 'medium', className, onClick }: IAvatarProps,
    ref: Ref<HTMLDivElement>,
): JSX.Element {
    const avatarSize = EAvatarSizes[size];

    return (
        <div
            ref={ref}
            className={cx(styles.avatar, className)}
            style={{
                width: avatarSize,
                height: avatarSize,
            }}
            onClick={onClick}
        >
            {image ? (
                <Image
                    src={image}
                    alt={name}
                    className={styles.image}
                    width={avatarSize}
                    height={avatarSize}
                />
            ) : (
                <Typography
                    variant={getTypographyVariant(size)}
                    className={styles.initials}
                >
                    {getInitials(name)}
                </Typography>
            )}
        </div>
    );
}

export default forwardRef(Avatar);
